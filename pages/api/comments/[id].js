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
}
