const postService = require('../services/PostService');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        res.json({ data: posts, status: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getPostsByUser = async (req, res, next) => {
  try {
      const posts = await postService.getPostsByUser(req.params.uid);
      res.json({ data: posts, status: 'success' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
  }
};
exports.getMyPosts = async (req, res, next) => {
  try {
      const posts = await postService.getMyPosts(req.user.uid);
      res.json({ data: posts, status: 'success' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
  }
};


exports.getPendingPost = async (req, res) => {
    try {
        const posts = await postService.getPendingPost();
        res.json({ data: posts, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        res.json({ data: post, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json({ data: post, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        res.json({ data: post, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.id);
        res.json({ data: post, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const checked = await postService.likePost(req.params.id, req.user.uid);
        res.json({ data: { liked: checked }, status: 'success' });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

exports.approvePost = async (req, res, next) => {
    try {
        const checked = await postService.approvePost(req.params.id, req.body.is_approved);
        res.json({ data: checked, status: 'success' });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};


exports.searchPost = async (req, res, next) => {
  try {
      const checked = await postService.searchPost(req.body.searchText);
      res.json({ data: checked, status: 'success' });
  } catch (err) {
      res.status(500).json({
          error: err.message,
      });
  }
};
