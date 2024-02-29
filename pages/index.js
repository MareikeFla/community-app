import EventList from "@/components/EventList/EventList";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomePage() {
  const { data, isLoading, error } = useSWR("/api/events", fetcher);

  if (isLoading) {
    return <p>is loading...</p>;
  }
  if (error) {
    return <p>error...</p>;
  }

  return <EventList events={data} />;
}
