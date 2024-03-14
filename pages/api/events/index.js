import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const events = await Event.find();
      if (!events) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(events);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "POST") {
    try {
      const event = request.body;

      const createdEvent = await Event.create(event);
      response
        .status(201)
        .json({ status: "Event created", newEventId: createdEvent._id });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
