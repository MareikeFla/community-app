import { useRouter } from "next/router";
import { DelteButton } from "./DeleteEventButton.styled";
import Image from "next/image";

export default function DeleteEventButton({ id, showDeleteModal }) {
  const router = useRouter();
  const modalContent = {
    message: "Dieses Event wirklich löschen?",
    textButtonClose: "Abbrechen",
    textButtonConfirm: "Löschen",
    onConfirm: handleDelete,
  };
  async function handleDelete() {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <DelteButton
      onClick={() => {
        showDeleteModal(modalContent);
      }}
    >
      <Image
        src="/assets/icons/icon_delete.svg"
        alt="Delete button"
        width={18}
        height={22}
      />
    </DelteButton>
  );
}
