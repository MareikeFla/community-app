import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import {
  createSearchPipline,
  createAutocompletePipeline,
} from "@/lib/mongoDBPipelines";

export default async function handler(request, response) {
  await dbConnect();

  //Deconstructore searchterm and keyword from query

  const searchTerm = request.query.searchTerm;
  const isSubmitted = request.query.isSubmitted === "true" ? true : false;

  // Check if query is for search or for autocomplete and set pipeline function accordingly

  const pipeline = isSubmitted
    ? createSearchPipline
    : createAutocompletePipeline;

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
