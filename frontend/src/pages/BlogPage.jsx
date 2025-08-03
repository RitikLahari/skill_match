import React from "react";
import BlogList from "../components/Blog/BlogList";
import CreateBlog from "../components/Blog/CreateBlog";

const BlogPage = () => {
  return (
    <div>
      <CreateBlog />
      <BlogList />
    </div>
  );
};

export default BlogPage;
