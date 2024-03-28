import mongoose from "mongoose";
import "./Event";

const { Schema } = mongoose;

const commentSchema = new Schema({
  creationDate: { type: Date },
  userName: { type: String },
  text: { type: String },
  userImageURL: { type: String },
  text: { type: String },
  isLiked: { type: Boolean },
  parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment" }, // Referenz auf den übergeordneten Kommentar
  parentEventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
