import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { useFindEventByID } from "@/lib/DataContext";

export default function EventDetailPage({ modalInfo, openModal, modalRef }) {
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
      <EventDetail event={event} showDeleteModal={openModal} />
      <ConfirmationModal
        modalRef={modalRef}
        modalInfo={modalInfo}
      ></ConfirmationModal>
    </>
  );
}
