import dbConnect from "@/db/connect";
import MetaInfo from "@/db/models/MetaInfo";
export default async function handler(request, response) {
  await dbConnect();
  const today = new Date().toISOString().split("T")[0];
  const id = "661e54d267205f127bef886b";

  if (request.method === "GET") {
    try {
      const [metaInfo] = await MetaInfo.find();
      if (!metaInfo) {
        return response.status(404).json({ status: "Not Found" });
      }
      metaInfo.isUpToDate = metaInfo.lastFetch === today;

      console.log(metaInfo);
      return response.status(200).json(metaInfo);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const metaInfo = await MetaInfo.findByIdAndUpdate(id, {
        lastFetch: today,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
