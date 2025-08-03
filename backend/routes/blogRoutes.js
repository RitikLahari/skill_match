import express from "express";
import { createBlog, getBlogs, addComment, getComments } from "../controllers/blogController.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getBlogs);
router.post("/:blogId/comment", addComment);
router.get("/:blogId/comments", getComments);

export default router;
