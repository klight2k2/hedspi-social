const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  likePost
} = require("../controllers/PostController");

const router = express.Router();

router.get('/',getAllPosts)
router.post("/",createPost);
router.post("/:id/like",likePost)
router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
