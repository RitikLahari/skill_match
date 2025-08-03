import React, { useState, useContext } from "react";
import { Context } from "../../main";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(Context);

  const authorName = user?.name || "Anonymous";
  const authorEmail = user?.email || "unknown@example.com";
  const authorRole = user?.role || "Job Seeker or Employer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/create`, {
        title,
        content,
        category,
        authorName,
        authorEmail,
        authorRole,
      });
      setTitle("");
      setContent("");
      setCategory("");
      setShowModal(false);
      toast.success("Blog posted!");
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Post Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          right: 32,
          bottom: 32,
          zIndex: 100,
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 28,
          boxShadow: "0 4px 16px rgba(99,102,241,0.18)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        title="Post a Blog or Tip"
      >
        +
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(30,41,59,0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 24px #050506ff",
            padding: 32,
            maxWidth: 420,
            width: "100%",
            position: "relative",
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#000000ff",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 50,
                height: 50,
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 2px 8px #e0e7ff",
              }}
              title="Close"
            >
              ×
            </button>
            <h2 style={{ textAlign: "center", marginBottom: 24, color: "#000000ff" }}>Your Experience</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", marginBottom: 16 }}
              />
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Content"
                required
                rows={5}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", marginBottom: 16 }}
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", marginBottom: 16 }}
              >
                <option value="">Select Category</option>
                <option value="Interview Experience">Interview Experience</option>
                <option value="Career Advice">Career Advice</option>
                <option value="Employer Tip">Employer Tip</option>
              </select>
              <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 0", borderRadius: 8, background: "#6366f1", color: "#fff", border: "none", fontWeight: 700, fontSize: 18 }}>
                {loading ? "Posting..." : "Post Blog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBlog;
