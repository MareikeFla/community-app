import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export default function EventDetailPage({ modalInfo, openModal, hook }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return (
    <>
      <EventDetail event={event} showDeleteModal={openModal} />
      <ConfirmationModal ref={hook} modalInfo={modalInfo}></ConfirmationModal>
    </>
  );
}
