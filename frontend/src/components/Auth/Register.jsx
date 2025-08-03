import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post( 
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
    <section
  className="authPage"
  style={{
    width: '100vw',
    minHeight: '150vh',
    margin: 0,
    padding: 0,
    background: 'url(bg.png) center/cover no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  }}
>

        {/* Glassmorphism overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(148, 123, 123, 0.39)',
          backdropFilter: 'blur(6px)',
          zIndex: 0.5,
        }} />
        <div
          className="container"
          style={{
            background: 'rgba(62, 62, 62, 0.42)',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(30,41,59,0.18)',
            // padding: '40px 32px',
            maxWidth: 400,
            width: '100%',
            margin: '32px 0',
            zIndex: 1,
            border: '1.5px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="header" style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: 1, textShadow: '0 2px 16px #22223b' }}>Register</h3>
          </div>
          <form style={{ width: '100%' }}>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Register As</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b' }}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser style={{ color: 'black', fontSize: 20, textShadow: '0 1px 8px #22223b' }} />
              </div>
            </div>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Name</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b' }}
                />
                <FaPencilAlt style={{ color: 'black', fontSize: 18, textShadow: '0 1px 8px #22223b' }} />
              </div>
            </div>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Email Address</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b' }}
                />
                <MdOutlineMailOutline style={{ color: 'black', fontSize: 18, textShadow: '0 1px 8px #22223b' }} />
              </div>
            </div>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Phone Number</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b' }}
                />
                <FaPhoneFlip style={{ color: 'black', fontSize: 18, textShadow: '0 1px 8px #22223b' }} />
              </div>
            </div>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b', paddingRight: 36 }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ position: 'absolute', right: 8, cursor: 'pointer', color: '#fff', fontSize: 18, textShadow: '0 1px 8px #22223b' }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ?'🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              disabled={loading}
              style={{
                background: 'rgba(255,255,255,0.85)',
                color: '#22223b',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                marginTop: 8,
                boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                letterSpacing: 1,
                width: '100%',
                hover: {
                  background: 'rgba(24, 40, 49, 0.95)',
              }}}
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>
            <Link to={"/login"} style={{ display: 'block', textAlign: 'center', marginTop: 16, color: '#fff', fontWeight: 600, textDecoration: 'underline', textShadow: '0 1px 8px #22223b' }}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
