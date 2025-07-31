import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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
          background: 'rgba(30,41,59,0.55)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }} />
        <div
          className="container"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(30,41,59,0.18)',
            padding: '40px 32px',
            maxWidth: 400,
            width: '100%',
            margin: '32px 0',
            zIndex: 2,
            border: '1.5px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="header" style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: 1, textShadow: '0 2px 16px #22223b' }}>Login</h3>
          </div>
          <form style={{ width: '100%' }}>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Login As</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b' }}>
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
                <FaRegUser style={{ color: 'black', fontSize: 20, textShadow: '0 1px 8px #22223b' }} />
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
                <MdOutlineMailOutline style={{ color: 'black', fontSize: 20, textShadow: '0 1px 8px #22223b' }} />
              </div>
            </div>
            <div className="inputTag" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#fff', textShadow: '0 1px 8px #22223b' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #fff', fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.25)', color: '#22223b', paddingRight: 36 }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ position: 'absolute', right: 8, cursor: 'pointer', color: '#fff', fontSize: 18, textShadow: '0 1px 8px #22223b' }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
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
                  background: 'rgba(26, 45, 56, 0.95)',
              }}}
        
            >
              {loading ? 'Submitting...' : 'Login'}
            </button>
            <Link to={"/register"} style={{ display: 'block', textAlign: 'center', marginTop: 16, color: '#fff', fontWeight: 600, textDecoration: 'underline', textShadow: '0 1px 8px #22223b' }}>Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
