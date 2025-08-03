import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";
import CreateBlog from "./CreateBlog";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/all`);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = category
    ? blogs.filter(blog => blog.category === category)
    : blogs;

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 32, color: "#000000ff" }}> Tips & Guidance</h2>
      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 16 }}
        >
          <option value="">All Categories</option>
          <option value="Interview Experience">Interview Experience</option>
          <option value="Career Advice">Career Advice</option>
          <option value="Employer Tip">Employer Tip</option>
        </select>
      </div>
      {filteredBlogs.length === 0 ? (
        <div>No blogs found for this category.</div>
      ) : (
        filteredBlogs.map(blog => <BlogPost key={blog._id} blog={blog} />)
      )}

      <CreateBlog onPost={fetchBlogs} />

    </div>
  );
};

export default BlogList;
