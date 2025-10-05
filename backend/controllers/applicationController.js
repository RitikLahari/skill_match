import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";
import { Chat } from "../models/chatSchema.js";
import nodemailer from "nodemailer";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG, JPEG, or WEBP file.", 400)
    );
  }
  
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
    
    if (!jobId) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    
    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantID ||
      !employerID ||
      !resume
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }
    
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    // Handle Cloudinary specific errors
    if (error.message && error.message.includes("api_key")) {
      console.error("Cloudinary API key error:", error.message);
      return next(new ErrorHandler("File upload service configuration error", 500));
    }
    
    // Handle any other errors
    return next(error);
  }
});

export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const acceptApplication = catchAsyncErrors(async (req, res, next) => {
  // only employer
  if (req.user.role !== "Employer") {
    return next(new ErrorHandler("Only employers can accept applications.", 403));
  }
  const { id } = req.params; // application id
  const application = await Application.findById(id);
  if (!application) return next(new ErrorHandler("Application not found", 404));
  if (application.isAccepted) return res.status(200).json({ success: true, message: "Application already accepted", application });

  // mark accepted and create chat
  application.isAccepted = true;
  // create or find chat
  let chat = await Chat.findOne({ employerId: application.employerID.user, jobSeekerId: application.applicantID.user });
  if (!chat) {
    chat = await Chat.create({ employerId: application.employerID.user, jobSeekerId: application.applicantID.user, messages: [] });
  }
  application.chatId = chat._id;
  await application.save();

  // Send acceptance email (best-effort)
  // Only attempt email if SMTP settings appear configured
  if ( !process.env.SMTP_MAIL || !process.env.SMTP_PASSWORD) {
    console.info("SMTP not configured - skipping acceptance email. Set SMTP_HOST, SMTP_USER and SMTP_PASS to enable email sending.");
  } else {
    try {
      const transporter = nodemailer.createTransport({
       service: "gmail",
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: application.email,
        subject: "Your application has been accepted",
        text: `Hello ${application.name},\n\nGood news — your application has been accepted by the employer. You can now chat with them via the portal.\n\nBest,\nSkill-Match Team`,
        html: `<p>Hello ${application.name},</p><p>Good news — your application has been <strong>accepted</strong> by the employer. You can now chat with them via the portal.</p><p>Best,<br/>Skill-Match Team</p>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      // Common cause: ECONNREFUSED when no SMTP server is reachable at given host/port
      console.error("Failed to send acceptance email:", mailErr?.message || mailErr);
      if (mailErr && mailErr.code === 'ECONNREFUSED') {
        console.error("ECONNREFUSED connecting to SMTP server. Make sure SMTP_HOST and SMTP_PORT are correct and the SMTP server is reachable. For local development use a service like Mailtrap or set SMTP env vars to a real provider (SendGrid, Gmail SMTP with app password, etc.).");
      }
      // Continue even if email fails
    }
  }
});

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
