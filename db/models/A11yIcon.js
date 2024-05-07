import mongoose from "mongoose";

const { Schema } = mongoose;

const a11yIconSchema = new Schema({
  name: String,
  icon: String,
});

const A11yIcon =
  mongoose.models.A11yIcon || mongoose.model("A11yIcon", a11yIconSchema);

export default A11yIcon;
