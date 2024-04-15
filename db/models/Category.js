import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  slug: { type: String },
  imageSource: String,
  imageAlt: String,
  color: String,
  subCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
