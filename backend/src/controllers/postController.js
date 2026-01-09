import Post from '../models/Post.js'
import Comment from '../models/comments.js'

// Create Post
export const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            user_id : req.body.user_id,
            title   : req.body.title,
            content : req.body.content,
            media   : req.body.media,
            tags    : req.body.tags
        });

        res.status(201).json({ message: "contenu publié", post });

    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Get All Posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user_id", "username email").sort({ createdAt: -1 });
        res.status(200).json({ status: true, message: posts })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
}

// Get a Single Post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("user_id", "username email").sort({ createdAt: -1 });

        if(!post) return res.status(404).json({ message:"Post not found" });

        res.status(200).json({ status: true, message: post })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Update Post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ status: true, message: " Post updated ✔ ", data: post });
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Delete Post
export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        // await Comment.deleteMany({ "post_id": req.parms.id });
        
        res.status(200).json({ message: "Post deleted ✔" })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Like : Unlike Post
export const togglePost = async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.id});

        post.likes += 1;

        // await post.save();

        res.json({ likes: post.likes });
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
}