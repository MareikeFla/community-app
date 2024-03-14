import { useRouter } from "next/router";
import Image from "next/image";
import { EditButton } from "./EditEventButton.styled";

export default function EditEventButton({ id }) {
  const router = useRouter();

  return (
    <EditButton
      title="Löschen"
      onClick={() => router.push(`/events/edit/${id}`)}
    >
      <Image
        src="/assets/icons/icon_edit.svg"
        alt="Edit button"
        width={22}
        height={22}
      />
    </EditButton>
  );
}
