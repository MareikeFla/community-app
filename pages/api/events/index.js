import dbConnect from "@/db/connect";
import Event from "@/db/models/Event";
import enrichEventObject from "@/lib/enrichEventObject";
import {
  fetchData,
  updateMetaInfo,
  mergeCategories,
  fetchUniqueEvents,
  updateEventDatabase,
  deleteEvent,
  findUniqueEventsInFirstArray,
} from "@/lib/dailyFetchHelper/functions";
import { formateEvents } from "@/lib/dailyFetchHelper/formatingData";
import {
  ourDB,
  metainfoUrl,
  koelnDB,
  koelnCategoriesUrl,
  ourCategoriesUrl,
  a11yIconsUrl,
  categoryRelation,
} from "@/lib/dailyFetchHelper/variables";

export default async function handler(request, response) {
  await dbConnect();

  const metainfo = await fetchData(metainfoUrl, ourDB);
  if (request.method === "GET") {
    try {
      const today = new Date().toISOString().split("T")[0];
      const events = await Event.find({
        "end.date": { $gte: today },
      }).populate("category");
      const ourEvents = events.map((event) => enrichEventObject(event));
      if (!metainfo.isUpToDate) {
        try {
          const koelnCategories = await fetchData(koelnCategoriesUrl, koelnDB);
          const ourCategories = await fetchData(ourCategoriesUrl, ourDB);
          const ourA11yIcons = await fetchData(a11yIconsUrl, ourDB);
          const koelnEventsInOurDataBase = ourEvents.filter(
            (event) => event.isFetchedEvent === true
          );
          const mergedCategories = mergeCategories(
            ourCategories,
            koelnCategories,
            categoryRelation
          );
          const uniqueEvents = await fetchUniqueEvents(mergedCategories);
          const formatedEvents = await formateEvents(
            uniqueEvents,
            ourA11yIcons
          );
          let deletedEvents = [];
          if (formatedEvents.length > 0) {
            deletedEvents = findUniqueEventsInFirstArray(
              koelnEventsInOurDataBase,
              formatedEvents
            );
            if (deletedEvents.length > 0) {
              deletedEvents.forEach((event) => deleteEvent(event._id));
            }
            formatedEvents.forEach((event) => updateEventDatabase(event));
          }
          updateMetaInfo();
        } catch (error) {
          updateMetaInfo();
          response.status(400).json({ error: error.message });
        }
      }

      return response.status(200).json(ourEvents);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PUT") {
    try {
      const event = request.body;
      const newEvent = await Event.create(event);
      response.status(201).json({ status: "Event created", id: newEvent._id });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
