import { useRouter } from "next/router";
import { EditButton } from "./EditEventButton.styled";
import { Edit } from "../SvgIcons/SVGIcons";
import { useTheme } from "styled-components";

export default function EditEventButton({ id }) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <EditButton
      title="Bearbeiten"
      onClick={() => router.push(`/events/edit/${id}`)}
      alt="Bearbeiten Icon"
    >
      <Edit $theme={theme} />
    </EditButton>
  );
}
