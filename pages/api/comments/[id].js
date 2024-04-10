import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { _id, userId, text } = request.body;
  if (request.method === "PATCH") {
    try {
      const comment = await Comment.findById(_id);
      if (!comment) {
        return response.status(404).json({ status: "Comment not found" });
      }

      if (comment.isLiked.includes(userId)) {
        comment.isLiked.pull(userId);
      } else {
        comment.isLiked.push(userId);
      }

      await comment.save();

      return response.status(200).json({ status: `Comment updated!` });
    } catch (error) {
      return response.status(500).json({ status: "Internal Server Error" });
    }
  }

  if (request.method === "POST") {
    try {
      await Comment.findByIdAndUpdate(_id, request.body);
      return response.status(200).json({ status: `Comment ${_id} edited!` });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
