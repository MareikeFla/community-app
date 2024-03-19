import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  const { _id, isLiked } = request.body;
  if (request.method === "PATCH") {
    await Comment.updateOne({ _id: _id }, { isLiked: isLiked });
    return response
      .status(200)
      .json({ status: `Comment ${request.body._id} updated!` });
  }
}
