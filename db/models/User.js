import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  creationDate: { type: Date, default: new Date() },
  name: { type: String },
  email: { type: String },
  image: { type: String },
  events: { type: Array },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
