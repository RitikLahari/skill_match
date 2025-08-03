import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  authorRole: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }, // Interview Experience, Career Advice, Employer Tip, etc.
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  authorRole: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

export const Blog = mongoose.model("Blog", blogSchema);
