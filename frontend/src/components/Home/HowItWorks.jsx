import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom"; // Make sure react-router-dom is installed
import { motion } from "framer-motion";

const HowItWorks = () => {
  const cardData = [
    {
      icon: <FaUserPlus />, color: '#6366f1',
      title: 'Create an Account',
      desc: 'Register as a job seeker or employer to unlock access to personalized job opportunities and candidate listings.',
      link: '/register', linkText: 'Sign Up Here'
    },
    {
      icon: <MdFindInPage />, color: '#fbbf24',
      title: 'Find a Job / Post a Job',
      desc: 'Search and apply for jobs that match your skills or post jobs to attract qualified candidates.',
      link: '/jobs', linkText: 'Explore Jobs'
    },
    {
      icon: <IoMdSend />, color: '#34d399',
      title: 'Apply for Jobs / Recruit Candidates',
      desc: 'Apply directly to job openings or review applications to find the best talent for your company.',
      link: '/job/getall', linkText: 'Go to Dashboard'
    },
  ];

  return (
    <section style={{ background: '#fffcfcff', minHeight: '60vh', width: '100%', padding: '48px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <h3 style={{ textAlign: 'center', fontWeight: 800, fontSize: 32, letterSpacing: 1, color: '#22223b', marginBottom: 36 }}>How Skill Match  Works!</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {cardData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: `0 8px 32px ${card.color}33` }}
              style={{
                background: `linear-gradient(135deg, #fff 60%, ${card.color}11 100%)`,
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: `2px solid ${card.color}22`,
                minHeight: 320,
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
            >
              <div style={{ fontSize: 44, color: card.color, marginBottom: 16 }}>{card.icon}</div>
              <p style={{ fontWeight: 700, fontSize: 22, color: '#22223b', margin: 0, marginBottom: 8 }}>{card.title}</p>
              <p style={{ color: '#555', fontWeight: 500, fontSize: 16, margin: 0, marginBottom: 18, textAlign: 'center' }}>{card.desc}</p>
              <Link to={card.link} style={{ color: card.color, fontWeight: 700, fontSize: 16, textDecoration: 'underline', marginTop: 'auto' }}>{card.linkText}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
