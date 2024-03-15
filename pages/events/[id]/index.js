import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useFindEventByID } from "@/lib/Data/DataContext";

export default function EventDetailPage() {
  const router = useRouter();
  const { event, isLoading, error } = useFindEventByID(router.query.id);

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
