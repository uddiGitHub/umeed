import mongoose from "mongoose";
import Subscribes from "./Subscribes";
import sendEmail from "../src/lib/sendEmail";

const postItemSchema = new mongoose.Schema({
    img: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{
        user: { type: String, required: true, trim: true },
        comment: { type: String, required: true, trim: true },
        date: { type: Date, default: Date.now },
    }]
}, { timestamps: true });


postItemSchema.post("save", async function (doc) {
    try {
        const subscribers = await Subscribes.find({});
        if (!subscribers.length) return;

        const emails = subscribers.map(s => s.email);
        const preview = doc.content.length > 200 ? doc.content.slice(0, 200) + "..." : doc.content;

        await sendEmail(
            emails.join(","),
            `New Article: ${doc.title}`,
            `
            <h1>${doc.title}</h1>
            <p>${preview}</p>
            <a href="${process.env.SITE_URL}/news/${doc._id}">Read Full Article</a>
            `
        );
    } catch (error) {
        console.error("Error sending update email:", error);
    }
});

export default mongoose.models.PostItem || mongoose.model("PostItem", postItemSchema);