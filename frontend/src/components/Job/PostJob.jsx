import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/job/post`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 620, width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '36px 28px', margin: '32px 0' }}>
        <h3 style={{ textAlign: 'center', fontWeight: 700, fontSize: 30, marginBottom: 28, color: '#3b3b3b', letterSpacing: 1 }}>POST NEW JOB</h3>
        <form onSubmit={handleJobPost} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', background: '#f3f4f6' }}
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN STACK Development</option>
              <option value="MERN Stack Development">MERN STACK Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <div style={{ marginBottom: 8 }}>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', background: '#f3f4f6', marginBottom: 8 }}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {salaryType === "default" ? (
                <p style={{ color: '#ef4444', fontSize: 15, margin: '6px 0' }}>Please provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                />
              ) : (
                <div style={{ display: 'flex', gap: 16 }}>
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 16, minHeight: 80, resize: 'vertical', outline: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
          />
          <button
            type="submit"
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
              cursor: 'pointer',
              transition: 'background 0.2s',
              letterSpacing: 1
            }}
          >
            Create Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
