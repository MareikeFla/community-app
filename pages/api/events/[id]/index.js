import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("api/[id]", id);

  if (request.method === "GET") {
    try {
      const event = await Event.findById(id);
      return response.status(200).json(event);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
