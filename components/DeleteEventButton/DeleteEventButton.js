import { DeleteButton } from "./DeleteEventButton.styled";
import Image from "next/image";
import { useModal } from "@/lib/useModal";
import { useData } from "@/lib/useData";

export default function DeleteEventButton({ id }) {
  const { deleteEvent } = useData();

  const { showModal } = useModal();
  const modalContent = {
    message: "Dieses Event wirklich löschen?",
    textButtonCancel: "Abbrechen",
    textButtonConfirm: "Löschen",
    onConfirm: () => deleteEvent(id),
  };

  return (
    <DeleteButton
      title="Löschen"
      onClick={() => {
        showModal(modalContent);
      }}
    >
      <Image
        src="/assets/icons/icon_delete.svg"
        alt="Delete button"
        width={21}
        height={23}
      />
    </DeleteButton>
  );
}
