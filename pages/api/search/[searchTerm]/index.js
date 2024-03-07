import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import { searchPipline, autocompletePipeline } from "@/lib/mongoDBPipelines";

export default async function handler(request, response) {
  await dbConnect();

  //Deconstructore searchterm and keyword from query

  const {
    query: { searchTerm },
  } = request;
  const {
    query: { keyword },
  } = request;

  // Check if query is for search or for autocomplete and set pipeline function accordingly

  const pipeline = keyword === "search" ? searchPipline : autocompletePipeline;

  if (request.method === "GET") {
    try {
      const result = await Event.aggregate(pipeline(searchTerm));

      return response.status(200).json(result);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
