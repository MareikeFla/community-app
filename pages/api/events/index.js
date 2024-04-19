import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import enrichEventObject from "@/lib/enrichEventObject";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const today = new Date().toISOString().split("T")[0];
      let events = await Event.find({
        "end.date": { $gte: today },
      }).populate("category");

      if (!events) {
        return response.status(404).json({ status: "Not Found" });
      }
      events = events.map((event) => enrichEventObject(event));

      return response.status(200).json(events);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "PUT") {
    try {
      const event = request.body;
      const newEvent = await Event.create(event);
      response.status(201).json({ status: "Event created", id: newEvent._id });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
