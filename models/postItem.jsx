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
    category: {
        type: String,
        required: false,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    // inContentImg1: {
    //     type: String,
    //     required: false,
    //     trim: true,
    // },
    // inContentImg2: {
    //     type: String,
    //     required: false,
    //     trim: true,
    // },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: {
            type: String,
            required: true,
            trim: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }]
}, { timestamps: true }
);
export default mongoose.models.PostItem || mongoose.model("PostItem", postItemSchema);
