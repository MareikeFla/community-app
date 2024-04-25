import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response
      .status(401)
      .json({ status: "Unauthorized: Session is required" });
  }

  const { userId, eventId } = request.body;

  if (request.method === "POST") {
    const userData = request.body;
    const id = userData.id;
    await User.findByIdAndUpdate(id, userData);
    return response.status(200).json({ status: `User ${id} updated!` });
  }

  if (request.method === "PATCH") {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ status: "User not found" });
      }

      if (user.attendedEvents.includes(eventId)) {
        user.attendedEvents.pull(eventId);
      } else {
        user.attendedEvents.push(eventId);
      }

      await user.save();

      return response.status(200).json({ status: `User updated!` });
    } catch (error) {
      return response.status(500).json({ status: "Internal Server Error" });
    }
  }
}
