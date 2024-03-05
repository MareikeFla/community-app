import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { searchTerm } = request.query;

  if (request.method === "GET") {
    try {
      const filteredEvents = await Event.find(
        { $text: { $search: searchTerm } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
      if (!filteredEvents) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(filteredEvents);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
