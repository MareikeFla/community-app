import { EditButton } from "../EditCommentButton/EditCommentButton.styled";
import Image from "next/image";

export default function EditCommentButton({ onEditComment, isEditing }) {
  return (
    <EditButton onClick={onEditComment}>
      {!isEditing ? (
        <Image
          src={"/assets/icons/icon_edit-grey.svg"}
          alt="Edit Button"
          height={16}
          width={16}
        />
      ) : (
        <Image
          src={"/assets/icons/icon_cancel.svg"}
          alt="Cancel Button"
          height={16}
          width={16}
        />
      )}
    </EditButton>
  );
}
