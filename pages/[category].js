import BackButton from "@/components/BackButton/BackButton";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function HomePage() {
  const router = useRouter();
  console.log(router.query.category);

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
      <EventList events={data} />
    </>
  );
}
