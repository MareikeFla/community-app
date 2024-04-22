import { adminID } from "./variables";

function extractIDFromUrl(url) {
  const linkPattern =
    /^https?:\/\/www\.stadt-koeln\.de\/leben-in-koeln\/veranstaltungen\/daten\/(.+?)\/index\.html/;
  const match = url.match(linkPattern);
  return match ? match[1] : null;
}

// Truncate description to fit in event short description
function truncateStringToLastWord(string, maxLength) {
  const shortendMaxLength = maxLength === 0 ? 0 : maxLength - 3;
  if (string.length <= maxLength) {
    return string;
  } else {
    const lastSpaceIndex = string.lastIndexOf(" ", shortendMaxLength);
    return string.slice(0, lastSpaceIndex) + "...";
  }
}

function expandDescription(oepnv, uhrzeit, description) {
  let fullDescription = description;
  if (oepnv) {
    fullDescription = description + "\n\nAnreise mit dem ÖPNV: " + oepnv;
  }
  // If start and end time could not be extracted from the uhrzeit value will be added to the description
  if (uhrzeit) {
    fullDescription = description + "\n\nInformationen zur Uhrzeit: " + uhrzeit;
  }
  return fullDescription;
}

function parseTimeString(input) {
  // This regular expression is used to match time ranges in a specific format.
  // It is useful for parsing strings that denote time intervals, such as '10:30 Uhr bis 14:45 Uhr' or '9 bis 12', verifying their format and extracting the times.
  const timePattern =
    /^(\d{1,2})(?::(\d{2}))?\s*(Uhr)?\s*bis\s*(\d{1,2})(?::(\d{2}))?(\s*Uhr)?$/;

  // Define a regex pattern to match a single time like '20 Uhr'.
  const singleTimePattern = /^(\d{1,2})(?::(\d{2}))?\s*Uhr$/;

  let matches = input.match(timePattern);

  if (matches) {
    const [
      _, // Full input is ignored
      startHour,
      startMinute = "00", // Default minutes to "00" if not provided
      __, // Uhr is ignored
      endHour,
      endMinute = "00",
    ] = matches;
    return {
      hasTime: true,
      hasStartTime: true,
      startTime: `${startHour.padStart(2, "0")}:${startMinute}`, // Add "0" in front of the hour until string has a length of 2
      hasEndTime: true,
      endTime: `${endHour.padStart(2, "0")}:${endMinute}`,
    };
  } else {
    // If no match for time range, try to match the single time pattern
    matches = input.match(singleTimePattern);
    if (matches) {
      const [_, startHour, startMinute = "00"] = matches;
      return {
        hasTime: true,
        hasStartTime: true,
        startTime: `${startHour.padStart(2, "0")}:${startMinute}`,
        hasEndTime: false,
        endTime: "",
      };
    } else {
      // If no valid time format found, return as false with the original input
      return {
        hasTime: false,
        value: input,
      };
    }
  }
}

function checkIsFreeOfCharge(string) {
  return (
    string.includes("kostenlos") ||
    string.includes("kostenfrei") ||
    string.includes("Der Eintritt ist frei")
  );
}

export function formateEvents(fetchedEvents) {
  const events = fetchedEvents.map((event) => {
    const {
      link,
      beginndatum,
      endedatum,
      title,
      description,
      teaserbild,
      uhrzeit,
      plz,
      ort,
      strasse,
      hausnummer,
      oepnv,
      latitude,
      longitude,
      preis,
      assignedCategoryId,
    } = event;

    const { hasTime, hasStartTime, hasEndTime, startTime, endTime, value } =
      parseTimeString(uhrzeit || "");

    const addTimeToDescriptionString = !hasTime ? value : "";

    const isFreeOfCharge = preis ? checkIsFreeOfCharge(preis) : true;

    const image = teaserbild
      ? { url: "https://www.stadt-koeln.de" + teaserbild }
      : undefined;

    const extractedId = extractIDFromUrl(link);

    return {
      isFetchedEvent: true,
      fetchedId: extractedId,
      createdBy: adminID,
      eventName: title || "",
      start: {
        date: beginndatum || "",
        time: hasTime && hasStartTime ? startTime : "",
      },
      end: {
        date: endedatum || beginndatum || "",
        time: hasTime && hasEndTime ? endTime : "",
      },
      location: {
        city: ort || "",
        zip: plz || "",
        street: strasse || "",
        houseNumber: hausnummer || "",
        country: "Deutschland",
        latitude: latitude || "",
        longitude: longitude || "",
      },
      category: assignedCategoryId || "",
      organization: {
        organizationName: "",
        organizationContact: "",
      },
      costs: isFreeOfCharge ? "Kostenlos" : preis,
      shortDescription: truncateStringToLastWord(description || "", 120),
      longDescription: expandDescription(
        oepnv || "",
        addTimeToDescriptionString,
        description || ""
      ),
      image,
      links: [
        {
          url: link || "",
          linkDescription: link ? "Mehr Informationen" : "",
        },
      ],
    };
  });
  return events;
}
