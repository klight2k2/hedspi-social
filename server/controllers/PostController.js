const postService = require("../services/PostService");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingPost = async (req, res) => {
  try {
    const posts = await postService.getPendingPost();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json({ data: posts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likePost = async (req,res,next) => {
  try{
    const checked = await postService.likePost(req.params.id,req.body.user_id);
    res.json({ data: {liked:checked}, status: "success" });
  }catch(err){
    res.status(500).json({
      error:err.message
    })
  }
};


exports.approvePost = async (req,res,next) => {
  try{
    const checked = await postService.approvePost(req.params.id,req.body.is_approved);
    res.json({ data: checked, status: "success" });
  }catch(err){
    res.status(500).json({
      error:err.message
    })

  }
 
};