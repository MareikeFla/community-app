import { useRouter } from "next/router";
import { DeleteButton } from "./DeleteEventButton.styled";
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
      return true;
    }
    return false;
  }

  return (
    <DeleteButton
      title="Löschen"
      onClick={() => {
        showDeleteModal(modalContent);
      }}
    >
      <Image
        src="/assets/icons/icon_delete.svg"
        alt="Delete button"
        width={22}
        height={26}
      />
    </DeleteButton>
  );
}
