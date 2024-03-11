import { useRouter } from "next/router";
import Image from "next/image";
import { EditButton } from "./EditEventButton.styled";

export default function EditEventButton({ event }) {
  const router = useRouter();
  async function handleEdit() {
    console.log(event);
    // const response = await fetch(`/api/events/${id}`, {
    //   method: "DELETE",
    // });
    // if (response.ok) {
    //   router.push("/");
    //   return true;
    // }
    // return false;
  }

  return (
    <EditButton title="Löschen" onClick={handleEdit}>
      <Image
        src="/assets/icons/icon_edit.svg"
        alt="Edit button"
        width={18}
        height={22}
      />
    </EditButton>
  );
}
