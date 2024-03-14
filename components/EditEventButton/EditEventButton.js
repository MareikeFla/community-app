import { useRouter } from "next/router";
import { EditButton, StyledEditIcon } from "./EditEventButton.styled";

export default function EditEventButton({ id }) {
  const router = useRouter();

  return (
    <EditButton
      title="Löschen"
      onClick={() => router.push(`/events/edit/${id}`)}
    >
      <StyledEditIcon
        src="/assets/icons/icon_edit.svg"
        alt="Edit button"
        width={22}
        height={22}
      />
    </EditButton>
  );
}
