import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const newComment = await Comment.create(request.body);
      response.status(201).json(newComment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    try {
      const comments = await Comment.find().populate({
        path: "createdBy",
        select: "name image",
      });
      if (!comments) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
