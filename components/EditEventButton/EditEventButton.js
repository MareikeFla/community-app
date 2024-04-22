import { useRouter } from "next/router";
import { EditButton } from "./EditEventButton.styled";
import { Edit } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";

export default function EditEventButton({ id }) {
  const { theme } = useColorTheme();
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
