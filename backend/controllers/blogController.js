import { Blog } from "../models/blogSchema.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncError.js";

// Create a new blog post
export const createBlog = catchAsyncErrors(async (req, res, next) => {
  const { title, content, category, authorName, authorEmail, authorRole } = req.body;
  const blog = await Blog.create({ title, content, category, authorName, authorEmail, authorRole });
  res.status(201).json({ success: true, blog });
});


export const getBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, blogs });
});

// Add a comment to a blog post
export const addComment = catchAsyncErrors(async (req, res, next) => {
  const { blogId } = req.params;
  const { text, authorName, authorEmail, authorRole } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  blog.comments.push({ text, authorName, authorEmail, authorRole });
  await blog.save();
  res.status(200).json({ success: true, blog });
});

// Get comments for a blog post
export const getComments = catchAsyncErrors(async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.status(200).json({ success: true, comments: blog.comments });
});
