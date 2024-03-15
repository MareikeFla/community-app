import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "POST") {
    try {
      const newComment = await Comment.create(request.body);
      const event = await Event.findById(id);
      event.comments.push(newComment._id);
      await event.save();

      response.status(201).json(newComment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    try {
      const event = await Event.findById(id)
        .populate("comments")
        .populate("category");
      return response.status(200).json(event);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    await Event.findByIdAndDelete(id);
    response.status(200).json({ status: `Event ${id} successfully deleted.` });
  }
}
