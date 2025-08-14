import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Subscribe || mongoose.model("Subscribe", SubscribeSchema);
