import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { category } = request.query;

  if (request.method === "GET") {
    try {
      const searchedCategory = await Category.findOne({ slug: category });
      const filteredEvents = await Event.find({
        category: searchedCategory.title,
      });
      return response.status(200).json(filteredEvents);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
