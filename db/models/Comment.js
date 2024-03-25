import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  creationDate: { type: Date },
  userName: { type: String },
  text: { type: String },
  userImageURL: { type: String },
  text: { type: String },
  isLiked: { type: Boolean },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment" }, // Referenz auf den übergeordneten Kommentar
  childComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Liste von untergeordneten Kommentaren
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
