import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import Comment from "@/db/models/Comment";
import enrichEventObject from "@/lib/enrichEventObject";
import { getSession } from "next-auth/react";
import User from "@/db/models/User";
import cloudinary from "cloudinary";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const session = await getSession({ req: request });

      const event = await Event.findById(id).populate("category");

      const attendeeCount = await User.countDocuments({
        attendedEvents: event._id,
      });
      if (!session) {
        const eventObject = enrichEventObject(event, attendeeCount);
        return response.status(200).json(eventObject);
      }

      const user = await User.findById(session.user.id);

      const eventAttendedByUser = user.attendedEvents?.includes(event._id);
      const eventObject = enrichEventObject(
        event,
        attendeeCount,
        eventAttendedByUser
      );

      return response.status(200).json(eventObject);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const event = await Event.findById(id);

      if (!event) {
        return response.status(404).json({ status: "Event not found" });
      }
      let hasImage = false;
      let imageDeleted = false;

      if (event.image && event.image.public_id) {
        hasImage = true;
        try {
          cloudinary.v2.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
          });

          await cloudinary.v2.uploader.destroy(event.image.public_id);
          imageDeleted = true;
        } catch (error) {
          console.error("Error deleting image:", error);
          imageDeleted = false;
        }
      }

      if (event.comments && event.comments.length) {
        await Comment.deleteMany({ _id: { $in: event.comments } });
      }

      await User.updateMany(
        { attendedEvents: id },
        { $pull: { attendedEvents: id } }
      );

      await Event.findByIdAndDelete(id);

      if (hasImage && imageDeleted) {
        return response.status(200).json({
          success: true,
          status: `Event ${id} and related image successfully deleted.`,
        });
      } else if (!hasImage) {
        return response.status(200).json({
          success: true,
          status: `Event ${id} successfully deleted.`,
        });
      } else if (hasImage && !imageDeleted) {
        return response.status(500).json({
          success: false,
          error: "Error deleting event or image",
        });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    const eventData = request.body;
    await Event.findByIdAndUpdate(id, eventData);
    return response.status(200).json({ status: `Event ${id} updated!` });
  }

  if (request.method === "PATCH") {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(id, request.body);

      if (!updatedEvent) {
        return response.status(404).json({ error: "Event not found" });
      }

      return response.status(200).json({ status: "Event updated" });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
