import BackButton from "@/components/BackButton/BackButton";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import PlaceholderCard from "@/components/PlaceholderCard/PlaceholderCard";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading, error } = useSWR(`/api/${router.query.category}`);

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
        <PlaceholderCard>Keine Events gefunden...</PlaceholderCard>
      ) : (
        <EventList events={data} />
      )}
    </>
  );
}
