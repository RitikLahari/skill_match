import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/all`)
      .then(res => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 32, color: "#000000ff" }}> Tips & Guidance</h2>
      {blogs.length === 0 ? (
        <div>No blogs yet.</div>
      ) : (
        blogs.map(blog => <BlogPost key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default BlogList;
