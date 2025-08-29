
// export default HeroSection;
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { animate, motion } from "framer-motion";

const HeroSection = () => {
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    jobSeekers: 0,
    employers: 0,
  });

  const jobsRef = useRef(null);
  const companiesRef = useRef(null);
  const seekersRef = useRef(null);
  const employersRef = useRef(null);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/statsController/stats`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log("Fetched Stats:", data);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats(); 

    const intervalId = setInterval(fetchStats, 10000); 

    return () => clearInterval(intervalId); 
  }, []);


  useEffect(() => {
    if (jobsRef.current) {
      animate(0, stats.jobs, {
        duration: 2,
        onUpdate: (v) => {
          if (jobsRef.current) jobsRef.current.textContent = Math.floor(v).toLocaleString();
        },
      });
    }

    if (companiesRef.current) {
      animate(0, stats.companies, {
        duration: 2,
        onUpdate: (v) => {
          if (companiesRef.current) companiesRef.current.textContent = Math.floor(v).toLocaleString();
        },
      });
    }

    if (seekersRef.current) {
      animate(0, stats.jobSeekers, {
        duration: 2,
        onUpdate: (v) => {
          if (seekersRef.current) seekersRef.current.textContent = Math.floor(v).toLocaleString();
        },
      });
    }

    if (employersRef.current) {
      animate(0, stats.employers, {
        duration: 2,
        onUpdate: (v) => {
          if (employersRef.current) employersRef.current.textContent = Math.floor(v).toLocaleString();
        },
      });
    }
  }, [stats]);

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#ffffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          padding: '60px 24px 0 24px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 320, zIndex: 2 }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: 'black', lineHeight: 1.1, marginBottom: 12, textShadow: '0 2px 16px #f6f6ffff' }}>
            Find a job that suits
            <br />
            <span style={{ color: '#030899ff', background: 'rgba(255, 255, 255, 0.82)', borderRadius: 8, padding: '0 8px' }}>your interests</span> and <span style={{ color: '#f472b6', background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '0 8px' }}>skills</span>
          </h1>
          <p style={{ fontSize: 20, color: '#000000ff', marginBottom: 32, fontWeight: 500, textShadow: '0 1px 8px #ffffffff' }}>
            Discover job opportunities that match your skills and passions.<br />
            Connect with employers seeking talent like yours for rewarding careers.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <img
            src="/heroS.jpg"
            alt="hero"
            style={{
              width: '100%',
              maxWidth: 420,
              borderRadius: 24,
              boxShadow: '0 8px 32px rgba(255, 255, 255, 1)',
              border: '6px solid #ffffffff',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          marginTop: 48,
          flexWrap: 'wrap',
          zIndex: 2,
        }}
      >
        <motion.div
          className="card"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            padding: '32px 28px',
            minWidth: 200,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #000000ff',
          }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="icon" style={{ fontSize: 38, color: '#6366f1', marginBottom: 8 }}><FaSuitcase /></div>
          <div className="content" style={{ textAlign: 'center' }}>
            <p ref={jobsRef} style={{ fontSize: 32, fontWeight: 700, color: 'black', margin: 0 }}>0</p>
            <p style={{ color: '#6366f1', fontWeight: 600, fontSize: 18, margin: 0 }}>Live Jobs</p>
          </div>
        </motion.div>
        <motion.div
          className="card"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            padding: '32px 28px',
            minWidth: 200,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #000000ff',
          }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="icon" style={{ fontSize: 38, color: '#fbbf24', marginBottom: 8 }}><FaBuilding /></div>
          <div className="content" style={{ textAlign: 'center' }}>
            <p ref={companiesRef} style={{ fontSize: 32, fontWeight: 700, color: 'black', margin: 0 }}>0</p>
            <p style={{ color: '#fbbf24', fontWeight: 600, fontSize: 18, margin: 0 }}>Companies</p>
          </div>
        </motion.div>
        <motion.div
          className="card"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            padding: '32px 28px',
            minWidth: 200,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #000000ff',
          }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="icon" style={{ fontSize: 38, color: '#f472b6', marginBottom: 8 }}><FaUsers /></div>
          <div className="content" style={{ textAlign: 'center' }}>
            <p ref={seekersRef} style={{ fontSize: 32, fontWeight: 700, color: 'black', margin: 0 }}>0</p>
            <p style={{ color: '#f472b6', fontWeight: 600, fontSize: 18, margin: 0 }}>Job Seekers</p>
          </div>
        </motion.div>
        <motion.div
          className="card"
          style={{
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            padding: '32px 28px',
            minWidth: 200,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #080000ff',
          }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="icon" style={{ fontSize: 38, color: '#34d399', marginBottom: 8 }}><FaUserPlus /></div>
          <div className="content" style={{ textAlign: 'center' }}>
            <p ref={employersRef} style={{ fontSize: 32, fontWeight: 700, color: 'black', margin: 0 }}>0</p>
            <p style={{ color: '#34d399', fontWeight: 600, fontSize: 18, margin: 0 }}>Employers</p>
          </div>
        </motion.div>
      </div>
      {/* Decorative blurred circles removed for white background */}
    </section>
)};

export default HeroSection;

     