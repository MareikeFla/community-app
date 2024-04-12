// pages/api/dailyTask.js
import Event from "@/db/models/Event";
export default async (req, res) => {
  if (req.method === "GET") {
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
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
