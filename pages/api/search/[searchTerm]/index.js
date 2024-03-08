import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { searchTerm } = request.query;

  if (request.method === "GET") {
    try {
      const filteredEvents = await Event.aggregate([
        {
          $search: {
            index: "fullText",
            text: {
              query: searchTerm,
              path: {
                wildcard: "*",
              },
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        {
          $sort: {
            score: { $meta: "textScore" },
          },
        },
        {
          $addFields: {
            textScore: { $meta: "searchScore" },
          },
        },
      ]);

      return response.status(200).json(filteredEvents);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
