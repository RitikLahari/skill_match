import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Function to handle file input changes with validation
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileError("");
    
    if (!file) {
      setResume(null);
      return;
    }
    
    // Check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select a valid image file (PNG, JPEG, or WEBP)");
      setResume(null);
      return;
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB");
      setResume(null);
      return;
    }
    
    setResume(file);
    
    // Ask user if they want to auto-fill form from resume
    if (window.confirm("Would you like to auto-fill the form using your resume?")) {
      await parseResumeWithGemini(file);
    }
  };

  const parseResumeWithGemini = async (file) => {
    try {
      setLoading(true);
      
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        
        // Prepare the image data
        const imageParts = [{
          inlineData: {
            data: base64Image,
            mimeType: file.type
          }
        }];

        // Generate content from the resume
        const result = await model.generateContent([
          `Extract the following information from this resume image: full name, email, phone number, address. Also, generate a short cover letter for applying to a Software Development, Web Development, Machine Learning, or AI role based on the resume content. Format the response as JSON with keys: name, email, phone, address, coverLetter`,
          ...imageParts
        ]);
        
        const response = await result.response;
        const text = response.text();
        
        try {
          // Remove markdown code block if present
          let cleanText = text.trim();
          if (cleanText.startsWith('```json')) {
            cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '').trim();
          } else if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```/, '').replace(/```$/, '').trim();
          }
          const parsedData = JSON.parse(cleanText);
          // Update form fields with default values for missing or null fields
          setName(parsedData.name || "");
          setEmail(parsedData.email || "");
          setPhone(parsedData.phone || "");
          const parsedAddress = parsedData.address !== null ? parsedData.address : "Address not provided";
          setAddress(parsedAddress);
          setCoverLetter(parsedData.coverLetter || "");
          toast.success("Resume data and cover letter extracted successfully!");
        } catch (error) {
          console.error("Error parsing response:", text);
          toast.error("Could not parse resume data. Please fill the form manually.");
        }
      };
    } catch (error) {
      toast.error("Error processing resume. Please fill the form manually.");
      console.error("Resume parsing error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !phone || !coverLetter) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Allow 'address' to be optional
    const finalAddress = address || "Address not provided";
    
    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", finalAddress);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      
      // Show specific message for Cloudinary errors
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is currently unavailable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 480, width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '32px 24px', margin: '32px 0' }}>
        <h3 style={{ textAlign: 'center', fontWeight: 700, fontSize: 28, marginBottom: 24, color: '#3b3b3b', letterSpacing: 1 }}>Application Form</h3>
        <form onSubmit={handleApplication} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, marginBottom: 2, outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, marginBottom: 2, outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, marginBottom: 2, outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, marginBottom: 2, outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, minHeight: 80, resize: 'vertical', marginBottom: 2, outline: 'none', transition: 'border 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <div style={{ marginBottom: 8 }}>
            <label style={{ textAlign: 'start', display: 'block', fontSize: 18, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
              Upload Resume
              <span style={{ marginLeft: '8px', color: '#7d9bbaff', cursor: 'pointer' }} title="Uploading your resume will offer to autofill the form using AI.">
                ℹ️
              </span>
              <p style={{ color: 'red', fontSize: 12, margin: '5px 0 0 0' }}>
                (Supported formats: PNG, JPEG, WEBP. Max size: 2MB)
              </p>
              <p style={{ color: '#3e46dcff', fontSize: 13, margin: '5px 0 0 0' }}>
                Tip: Upload your resume to quickly autofill your details using AI.
              </p>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '8px 0', fontSize: 15, borderRadius: 8, border: '1px solid #d1d5db', background: '#f3f4f6' }}
            />
            {fileError && (
              <p style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
                {fileError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 18,
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              marginTop: 8,
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              letterSpacing: 1
            }}
          >
            {loading ? 'Submitting...' : 'Send Application'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;