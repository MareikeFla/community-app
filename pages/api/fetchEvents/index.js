import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const response = await fetch(
        "https://www.stadt-koeln.de/externe-dienste/open-data/events-od.php"
      );

      if (!response) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(response);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
