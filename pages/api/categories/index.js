import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const categories = await Category.find();
      if (!categories) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
