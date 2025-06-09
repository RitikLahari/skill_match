import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom"; // Make sure react-router-dom is installed

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works!</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create an Account</p>
              <p>
                Register as a job seeker or employer to unlock access to
                personalized job opportunities and candidate listings.
              </p>
              <Link to="/register">Sign Up Here</Link>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job / Post a Job</p>
              <p>
                Search and apply for jobs that match your skills or post jobs to
                attract qualified candidates.
              </p>
              <Link to="/jobs">Explore Jobs</Link>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply for Jobs / Recruit Candidates</p>
              <p>
                Apply directly to job openings or review applications to find
                the best talent for your company.
              </p>
              <Link to="/job/getall">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
