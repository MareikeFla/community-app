import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  dbConnect();

  if (request.method === "GET") {
    try {
      const events = await Event.find();
      return response.status(200).json(events);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
