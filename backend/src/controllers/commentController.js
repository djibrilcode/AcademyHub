import Comment from '../models/comments.js'

// Create comment
export const createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            user_id : req.body.user_id,
            post_id   : req.body.post_id,
            message : req.body.message,
        });

        res.status(201).json({ message: "contenu publié", comment });

    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Get All comments
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate("post_id", "","user_id", "username email").sort({ createdAt: -1 });
        res.status(200).json({ status: true, message: comments })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
}

// Get a Single comment
export const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate("user_id", "username email").sort({ createdAt: -1 });

        if(!comment) return res.status(404).json({ message:"comment not found" });

        res.status(200).json({ status: true, message: comment })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Update comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ status: true, message: " comment updated ✔ ", data: comment });
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// Delete comment
export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        // await Comment.deleteMany({ "comment_id": req.parms.id });
        
        res.status(200).json({ message: "comment deleted ✔" })
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
};