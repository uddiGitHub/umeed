import mongoose from "mongoose";

const postItemSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true }
);
const PostItem = mongoose.model.PostItem || mongoose.model("PostItem", postItemSchema);
export default PostItem;
