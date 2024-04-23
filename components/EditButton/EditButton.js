import { StyledEditButton } from "./EditButton.styled";
import Image from "next/image";

export default function EditButton({ onEdit, isEditing }) {
  return (
    <StyledEditButton type="button" onClick={onEdit}>
      {!isEditing ? (
        <Image
          src="/assets/icons/icon_edit-grey.svg"
          alt="Edit Button"
          height={14}
          width={14}
        />
      ) : (
        <Image
          src="/assets/icons/icon_cancel.svg"
          alt="Cancel Button"
          height={12}
          width={12}
        />
      )}
    </StyledEditButton>
  );
}
