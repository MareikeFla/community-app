import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";

export default function EventDetailPage() {
  const router = useRouter();

  const {
    data: event,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/events/${router.query.id}`);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return (
    <>


      <EventDetail event={event} />

    </>
  );
}
