import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    message : { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);