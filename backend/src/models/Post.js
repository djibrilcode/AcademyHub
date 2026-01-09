import mongoose from 'mongoose';

const mediaSchema = mongoose.Schema({
    type: { type: String, enum: ['image', 'video', 'audio', 'pdf'], required: true },
    url: { type: String, required: true },
}, { _id: false });

const postSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    media: [mediaSchema],
    tags: [{ type: String }],
    category: {  type: String },
    likes: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    is_published: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },

}, { timestamps: true });

export default mongoose.model('Post', postSchema);