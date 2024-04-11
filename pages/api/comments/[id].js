import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { _id, userId } = request.body;
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

  if (request.method === "DELETE") {
    const { id } = request.query;
    try {
      const comment = await Comment.findById(id);

      if (!comment) {
        return response.status(404).json({ status: "Comment not found" });
      }

      await Comment.deleteMany({ parentCommentId: id });

      await Comment.findByIdAndDelete(id);

      response.status(200).json({
        status: `Comment ${_id} and related replies successfully deleted.`,
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
