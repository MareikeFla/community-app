import { DeleteButton } from "./DeleteEventButton.styled";
import Image from "next/image";
import { useModal } from "@/lib/useModal";
import { useData } from "@/lib/useData";
import { useRouter } from "next/router";
import { useColorTheme } from "@/lib/useColorTheme";
import { Delete } from "../SvgIcons/SVGIcons";

export default function DeleteEventButton({ id }) {
  const router = useRouter();
  const { theme } = useColorTheme();
  const { deleteEvent } = useData();

  const { showModal } = useModal();
  const modalContent = {
    message: "Dieses Event wirklich löschen?",
    textButtonCancel: "Abbrechen",
    textButtonConfirm: "Löschen",
    onConfirm: () => {
      const wasSuccessfull = deleteEvent(id);
      if (wasSuccessfull) {
        router.push("/");
        return wasSuccessfull;
      } else if (!wasSuccessfull) {
        return wasSuccessfull;
      }
    },
  };

  return (
    <DeleteButton
      title="Löschen"
      onClick={() => {
        showModal(modalContent);
      }}
    >
      <Delete $theme={theme}></Delete>
    </DeleteButton>
  );
}
