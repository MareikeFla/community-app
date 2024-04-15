import { EditButton } from "../EditCommentButton/EditCommentButton.styled";
import Image from "next/image";

export default function EditCommentButton({ onEditComment, isEditing }) {
  return (
    <EditButton onClick={onEditComment}>
      {!isEditing ? (
        <Image
          src={"/assets/icons/icon_edit-grey.svg"}
          alt="Edit Button"
          height={14}
          width={14}
        />
      ) : (
        <Image
          src={"/assets/icons/icon_cancel.svg"}
          alt="Cancel Button"
          height={12}
          width={12}
        />
      )}
    </EditButton>
  );
}
