import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  slug: String,
  imageSource: String,
  imageAlt: String,
  color: String,
  subCategories: [
    {
      title: String,
      slug: String,
      imageSource: String,
      imageAlt: String,
      parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    },
  ],
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
