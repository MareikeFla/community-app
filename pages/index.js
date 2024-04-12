import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";

export function restructureEvents(events) {
  const newEvents = events.map((event, i) => {
    const startDateTime = new Date(event.startDate);
    const startDate = startDateTime.toISOString().split("T")[0];
    const startTime = startDateTime.toTimeString().split(" ")[0];

    const endDateTime = new Date(event.endDate);
    const endDate = endDateTime.toISOString().split("T")[0];
    const endTime = endDateTime.toTimeString().split(" ")[0];

    const address = event.locationAddress;
    let street = "";
    let houseNumber = "";
    let zip = "";
    let city = "";

    if (address) {
      // Aufteilung des Strings anhand des Kommas und Trimmen von überschüssigen Leerzeichen
      const parts = address.split(",").map((part) => part.trim());

      // Der erste Teil enthält die Straße und die Hausnummer
      const streetAndNumber = parts[0];

      // Verwendung eines regulären Ausdrucks, um Zahlen (und optionale Buchstaben hinter Zahlen) zu finden
      const houseNumberMatch = streetAndNumber.match(/\d+\s*\w*/);
      houseNumber = houseNumberMatch ? houseNumberMatch[0].trim() : "";

      // Extraktion der Straße durch Entfernen der Hausnummer aus dem String
      street = houseNumber
        ? streetAndNumber.replace(houseNumber, "").trim()
        : streetAndNumber;

      // PLZ und Stadt aus den Teilen extrahieren
      zip = parts[1];
      city = parts[2];
    }

    return {
      isBonnEvent: true,
      _id: i,
      eventName: event.title,
      start: {
        date: startDate,
        time: startTime,
      },
      end: {
        date: endDate,
        time: endTime,
      },
      location: {
        city,
        zip,
        street,
        houseNumber,
        country: "Deutschland",
        latitude: "00.000",
        longitude: "00.000",
      },
      category: {
        $oid: "65e59c0d9c937cf5141d852f",
      },
      organization: {
        organizationName: event.locationName,
        organizationContact: ".",
      },
      costs: "unbekannt",
      shortDescription: event.description,
      longDescription: event.description,

      links: [
        {
          url: event.link,
          linkDescription: "Mehr Informationen",
        },
      ],
    };
  });
  return newEvents;
}

export default function HomePage() {
  const { events, isLoadingEvents, errorEvents } = useData().fetchedEvents;
  const { eventsBonn, isLoadingEventsBonn, errorEventsBonn } =
    useData().fetchedBonnEvents;
  if (isLoadingEvents || isLoadingEventsBonn) {
    return <Loading />;
  }
  if (errorEvents || errorEventsBonn) {
    return <FetchingError />;
  }
  const foo = restructureEvents(eventsBonn);
  const foo2 = foo.filter((event) => event.longDescription !== "");
  console.log(foo2);
  return (
    <>
      <WelcomeCard />
      <CategoryList />
      <EventList events={foo2} title={"Aktuelle Events"} />
    </>
  );
}
