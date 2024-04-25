import dbConnect from "@/db/connect";
import A11yIcon from "@/db/models/A11yIcon";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const icons = await A11yIcon.find();
      if (!icons) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(icons);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
