import mongoose from "mongoose";
import "./Event";

const { Schema } = mongoose;

const userSchema = new Schema({
  creationDate: { type: Date, default: new Date() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  attendedEvents: { type: [Schema.Types.ObjectId], ref: "Event" },
  colorTheme: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
