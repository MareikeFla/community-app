import Event from "@/db/models/Event";
import { ourDB, koelnDB, metainfoUrl } from "./variables";

export async function fetchData(url, db) {
  if (db === ourDB) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  if (db === koelnDB) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      const dataItems = data.items;
      return dataItems;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}

export async function fetchUniqueEvents(mergedCategories) {
  const modifiedEvents = [];

  for (const obj of mergedCategories) {
    // Fetch Events from every category we assigned on categoryRelation array
    try {
      const response = await fetch(
        `https://www.stadt-koeln.de/externe-dienste/open-data/events-od.php?&kat=${obj.id}&ndays=365&nobrs=1`
      );

      if (!response.ok) {
        console.error(
          `Error fetching data for category ${obj.id}: ${response.statusText}`
        );
        continue;
      }

      const result = await response.json();
      if (!result.items || !Array.isArray(result.items)) {
        console.error(`Invalid JSON response for category ${obj.id}`);
        continue;
      }
      // The fetch result is an object - The imtems key contains an array with the event objects
      const items = result.items.map((item) => ({
        ...item,
        assignedCategoryId: obj.assignedCategory._id,
      }));

      modifiedEvents.push(...items);
    } catch (error) {
      console.error(`Error fetching data for category ${obj.id}: ${error}`);
      continue;
    }
  }
  // In contrast to our app, events can have more than one category
  // To prevent having one event multiple times we will create an array with unique events based on the event link (There is no ID key)
  const eventMap = {};
  modifiedEvents.forEach((event) => {
    if (eventMap.hasOwnProperty(event.link)) {
      return;
    } else {
      eventMap[event.link] = { ...event };
    }
  });
  const uniqueEvents = Object.values(eventMap);
  return uniqueEvents;
}

export async function upDateMetaInfo() {
  try {
    const result = await fetch(metainfoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating meta info:", error);
  }
}

export function mergeCategories(
  ourCategories,
  koelnCategories,
  categoryRelation
) {
  const categoryMap = new Map();

  ourCategories.forEach((category) => {
    categoryMap.set(category.title, category);
  });

  // Map fetched categories to our categories based on the relation defined
  const mergedCategories = koelnCategories
    .map((fetchCat) => {
      const relation = categoryRelation.find(
        (rel) => rel.category === fetchCat.kategorie
      );
      if (relation && categoryMap.has(relation.assignTo)) {
        const ourCat = categoryMap.get(relation.assignTo);
        return {
          ...fetchCat,
          assignedCategory: {
            _id: ourCat._id,
            title: ourCat.title,
            slug: ourCat.slug,
            imageSource: ourCat.imageSource,
            imageAlt: ourCat.imageAlt,
            color: ourCat.color,
          },
        };
      }
      return null;
    })
    .filter((cat) => cat !== null);

  return mergedCategories;
}

export async function updateEventDatabase(event) {
  try {
    const filter = { fetchedId: event.fetchedId };
    const options = { upsert: true };
    await Event.findOneAndUpdate(filter, event, options);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Datenbank:", error);
  }
}

export async function deleteEvent(id) {
  await fetch(`http://localhost:3000/api/events/${id}`, {
    method: "DELETE",
  });
}

export function findUniqueEventsInFirstArray(eventArray1, eventArray2) {
  const fetchedIdInArray2 = new Set(
    eventArray2.map((event) => event.fetchedId)
  );
  return eventArray1.filter((event) => !fetchedIdInArray2.has(event.fetchedId));
}
