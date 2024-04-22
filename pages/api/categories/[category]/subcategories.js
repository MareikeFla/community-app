import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  const { category } = request.query;

  if (request.method === "GET") {
    try {
      const mainCategory = await Category.findOne({ slug: category });
      if (!mainCategory) {
        return response.status(404).json({ status: "Main category not found" });
      }
      const subCategories = mainCategory.subCategories;
      return response.status(200).json(subCategories);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
