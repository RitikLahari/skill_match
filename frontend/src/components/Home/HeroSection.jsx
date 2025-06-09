
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
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interests and skills</h1>
          <p>
            Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding careers.
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>

      <div className="details">
        <motion.div className="card">
          <div className="icon"><FaSuitcase /></div>
          <div className="content">
            <p ref={jobsRef}>0</p>
            <p>Live Jobs</p>
          </div>
        </motion.div>

        <motion.div className="card">
          <div className="icon"><FaBuilding /></div>
          <div className="content">
            <p ref={companiesRef}>0</p>
            <p>Companies</p>
          </div>
        </motion.div>

        <motion.div className="card">
          <div className="icon"><FaUsers /></div>
          <div className="content">
            <p ref={seekersRef}>0</p>
            <p>Job Seekers</p>
          </div>
        </motion.div>

        <motion.div className="card">
          <div className="icon"><FaUserPlus /></div>
          <div className="content">
            <p ref={employersRef}>0</p>
            <p>Employers</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

     