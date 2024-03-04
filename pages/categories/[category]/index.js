import BackButton from "@/components/BackButton/BackButton";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading, error } = useSWR(
    `/api/categories/${router.query.category}`
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return (
    <>
      <BackButton />
      {data.length === 0 ? (
        <MessageCard>Keine Events gefunden...</MessageCard>
      ) : (
        <EventList events={data} />
      )}
    </>
  );
}
