import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../main";

const BlogPost = ({ blog }) => {
  const [comments, setComments] = useState(blog.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);

  const authorName = user?.name || "Anonymous";
  const authorEmail = user?.email || "unknown@example.com";
  const authorRole = user?.role || "Job Seeker or Employer";

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${blog._id}/comment`, {
        text: commentText,
        authorName,
        authorEmail,
        authorRole,
      });
      setComments(res.data.blog.comments);
      setCommentText("");
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #dde3f8ff", marginBottom: 32, padding: 24 }}>
      <h3 style={{ color: "#000000ff", marginBottom: 8 }}>{blog.title}</h3>
      <div style={{ fontSize: 15, color: "#22223b", marginBottom: 12 }}>{blog.content}</div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
        <span>By {blog.authorName} ({blog.authorRole})</span> | <span>{new Date(blog.createdAt).toLocaleString()}</span>
      </div>
      <div style={{ fontSize: 13, color: "#6366f1", marginBottom: 8 }}>Category: {blog.category}</div>
      <button
        onClick={() => setShowComments((prev) => !prev)}
        style={{
          background: showComments ? "#ff0a0aff" : "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
          marginBottom: 10,
          cursor: "pointer",
        }}
      >
        {showComments ? "Hide Comments" : `Show Comments (${comments.length})`}
      </button>
      {showComments && (
        <>
          <form onSubmit={handleComment} style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              style={{ width: "70%", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", marginRight: 8 }}
              required
            />
            <button type="submit" disabled={loading || !commentText} style={{ padding: "8px 16px", borderRadius: 8, background: "#6366f1", color: "#fff", border: "none", fontWeight: 600 }}>
              {loading ? "Posting..." : "Comment"}
            </button>
          </form>
          <div>
            {comments.length === 0 ? (
              <div style={{ color: "#888" }}>No comments yet.</div>
            ) : (
              comments.slice().reverse().map((c, idx) => (
                <div key={idx} style={{ background: "#f3f4f6", borderRadius: 8, padding: "8px 12px", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, color: "#22223b" }}>{c.text}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>By {c.authorName} ({c.authorRole}) | {new Date(c.createdAt).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPost;
