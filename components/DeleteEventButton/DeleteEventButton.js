import { useRouter } from "next/router";
import { DelteButton } from "./DeleteEventButton.styled";
import Image from "next/image";

export default function DeleteEventButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <DelteButton onClick={handleDelete}>
      <Image
        src="/assets/icons/icon_delete.svg"
        alt="Delete button"
        width={18}
        height={22}
      />
    </DelteButton>
  );
}
