import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  userName: { type: String },
  text: { type: String },
  userImageURL: { type: String },
  text: { type: String },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
