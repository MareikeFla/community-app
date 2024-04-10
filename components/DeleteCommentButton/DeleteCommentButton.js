import { DeleteButton } from "./DeleteCommentButton.styled";

export default function DeleteCommentButton({ onDeleteComment }) {
  return (
    <DeleteButton type="button" onClick={onDeleteComment}>
      Löschen
    </DeleteButton>
  );
}
