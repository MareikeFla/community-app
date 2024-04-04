import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import Comment from "@/db/models/Comment";
import enrichEventObject from "@/lib/enrichEventObject";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const event = await Event.findById(id).populate("category");
      return response.status(200).json(event);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const event = await Event.findById(id);

      if (!event) {
        return response.status(404).json({ status: "Event not found" });
      }

      if (event.comments.length) {
        await Comment.deleteMany({ _id: { $in: event.comments } });
      }

      await Event.findByIdAndDelete(id);

      response.status(200).json({
        status: `Event ${id} and related comments successfully deleted.`,
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    const eventData = request.body;
    await Event.findByIdAndUpdate(id, eventData);
    return response.status(200).json({ status: `Event ${id} updated!` });
  }
}
