import nodemailer from "nodemailer";
import { User } from "../models/userSchema.js"; // updated
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import bcrypt from "bcrypt";
import { OTP } from "../models/otpSchema.js";

export const emailsend = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Expire after 10 mins
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Delete old OTPs for this user
  await OTP.deleteMany({ email });

  // Save new OTP
  await OTP.create({ email, code, expiresAt });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Skill-Match Password Reset Code",
    text: `Your password reset code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ success: true, message: "OTP sent to email" });
});


export const changepassword = catchAsyncErrors(async (req, res, next) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword)
    return res.status(400).json({ success: false, message: "All fields are required" });

  const otpEntry = await OTP.findOne({ email, code });
  if (!otpEntry)
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  if (otpEntry.expiresAt < new Date())
    return res.status(400).json({ success: false, message: "OTP has expired" });

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // const hashedPassword = await bcrypt.hash(newPassword, 10);
  // user.password = hashedPassword;
  // console.log("Password changed for user:", user.email, "New Password", hashedPassword);
   user.password = newPassword;
  await user.save();
  // Clean up used OTP
  await OTP.deleteMany({ email });

  res.status(200).json({ success: true, message: "Password reset successful" });
});
