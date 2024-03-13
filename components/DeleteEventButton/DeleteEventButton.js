import { useRouter } from "next/router";
import { DeleteButton } from "./DeleteEventButton.styled";
import Image from "next/image";
import { useModal } from "@/lib/useModal";

export default function DeleteEventButton({ id }) {
  const router = useRouter();
  const { showModal } = useModal();
  const modalContent = {
    message: "Dieses Event wirklich löschen?",
    textButtonCancel: "Abbrechen",
    textButtonConfirm: "Löschen",
    onConfirm: handleDelete,
  };

  async function handleDelete() {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      return true;
    }
    return false;
  }

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
        width={18}
        height={22}
      />
    </DeleteButton>
  );
}
