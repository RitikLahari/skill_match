import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import ChatModal from "../Chat/ChatModal";
import axios from "axios";
import './MyApplication.css' 
const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [atsScores, setAtsScores] = useState({});

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplicationsWithKeywordScore = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/employer/getall`, {
            withCredentials: true,
          });
          // For each application, calculate keyword match score
          const appsWithScore = res.data.applications.map(app => {
            // Combine cover letter and address (or other fields) for matching
            const combinedText = `${app.coverLetter || ''} ${app.address || ''}`;
            const matchScore = getKeywordMatchScore(combinedText);
            return { ...app, matchScore };
          });
          setApplications(appsWithScore);
        } else {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/jobseeker/getall`, {
            withCredentials: true,
          });
          setApplications(res.data.applications);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchApplicationsWithKeywordScore();
    // eslint-disable-next-line
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openChat = async (application) => {
    // application contains applicant and employer ids
    try {
      // open existing chat — chat history will be fetched by ChatModal
      const employerId = application.employerID.user;
      const jobSeekerId = application.applicantID.user;
      setActiveChat({ chatId: application.chatId || null, employerId, jobSeekerId });
      setChatOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptApplication = async (applicationId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/accept/${applicationId}`, {}, { withCredentials: true });
      toast.success(res.data.message || 'Application accepted');
      const updatedApp = res.data.application;
      setApplications(prev => prev.map(a => a._id === updatedApp._id ? { ...a, isAccepted: true, chatId: updatedApp.chatId } : a));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to accept application');
    }
  };

  // Only sort and show keyword match for employer
  const sortedApplications =
    user && user.role === "Employer"
      ? [...applications].sort((a, b) => b.matchScore - a.matchScore)
      : applications;

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <center>
          <h1>My Applications</h1>
          </center>
          {applications.length <= 0 ? (
            <>
              {" "}
              <center>
              <h4>No Applications Found</h4></center>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                  openChat={openChat}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <center>
            <h1>Applications From Job Seekers</h1>
          </center>
          {sortedApplications.length <= 0 ? (
            <>
              <center>
                <h4>No Applications Found</h4>
              </center>
            </>
          ) : (
                sortedApplications.map((element, idx) => {
              const isTop = idx < Math.ceil(sortedApplications.length * 0.1); // top 10%
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  matchScore={element.matchScore}
                  isTop={isTop}
                      openChat={openChat}
                      acceptApplication={acceptApplication}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
      {chatOpen && activeChat && (
        <ChatModal chatInfo={activeChat} onClose={() => setChatOpen(false)} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal, openChat }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
        {/* {element.isAccepted ? (
          <button className="chat-icon" onClick={() => openChat(element)} title="Open Chat">💬</button>
        ) : (
          // show accept button only to employer view via EmployerCard; JobSeekerCard keeps delete only
          null
        )} */}
      </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
          {element.isAccepted && (
            <button className="chat-btn" onClick={() => openChat(element)}>Chat</button>
          )}
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal, matchScore, isTop, openChat, acceptApplication }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
        <p style={{ fontWeight: 'bold', color: matchScore > 70 ? '#2ecc40' : '#007bff' }}>
          Skills Match: {matchScore}% {isTop && <span style={{ background: '#ffd700', color: '#222', borderRadius: '6px', padding: '2px 8px', marginLeft: '8px', fontWeight: 'bold' }}>Top Candidate</span>}
        </p>
      </div>
        <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        {!element.isAccepted ? (
          <button className="accept-btn" onClick={() => acceptApplication(element._id)}>Accept</button>
        ) : (
          <button className="chat-btn" onClick={() => openChat(element)}>Chat</button>
        )}
      </div>
    </div>
  );
};

// Render Chat modal
// ...existing code...


const REQUIRED_KEYWORDS = [
  "react",
  "node.js",
  "javascript",
  "css",
  "html",
  "problem-solving",
  "api",
  "frontend",
  "backend",
  "web development",
  "git",
  "teamwork",
  "communication",
  "machine learning",
  "data analysis",
  "cloud computing",
  "agile",
  "devops",
  "project management",
  "software development",
  "testing",
  "debugging",
  "version control",
];

const getKeywordMatchScore = (text) => {
  if (!text) return 0;
  const lowerText = text.toLowerCase();
  const matches = REQUIRED_KEYWORDS.filter(keyword => lowerText.includes(keyword));
  return Math.round((matches.length / REQUIRED_KEYWORDS.length) * 100);
};
