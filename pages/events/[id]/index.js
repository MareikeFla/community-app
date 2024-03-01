import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);
  console.log(event);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return <EventDetail event={event} />;
}
