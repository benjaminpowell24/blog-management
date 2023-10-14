import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: "Users"},
    post: {
        title: {type: String, require: true},
        topic: {type: String},
        content: {type: String, require: true},
        status: {type: String, default: "Published"},
    }
},{
    timestamps: true
});

export const PostModel = mongoose.model("Posts", PostSchema);