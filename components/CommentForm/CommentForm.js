import { useData } from "@/lib/useData";
import DeleteCommentButton from "../DeleteCommentButton/DeleteCommentButton";
import {
  CommentButton,
  CommentFormContainer,
  CommentFormLabel,
  CommentFormTextarea,
  EditButtonSection,
} from "./CommentForm.styled";
import { useModal } from "@/lib/useModal";

export default function CommentForm({
  onPostComment,
  isEditing,
  comment = {},
}) {
  const { deleteComment } = useData();

  const { showModal } = useModal();

  const modalContent = {
    message: "Diesen Kommentar (und eventuelle Antworten) wirklich löschen?",
    textButtonCancel: "Abbrechen",
    textButtonConfirm: "Löschen",
    onConfirm: () => deleteComment(comment._id),
  };

  function handleSubmitComment(event) {
    event.preventDefault();
    onPostComment(event.target.comment.value);
    event.target.reset();
  }

  return (
    <CommentFormContainer onSubmit={handleSubmitComment} $editing={isEditing}>
      <CommentFormLabel htmlFor="comment" $hidden={isEditing}>
        Dein Kommentar
      </CommentFormLabel>
      <CommentFormTextarea
        id="comment"
        rows={isEditing ? "3" : "5"}
        defaultValue={comment.text}
        $editing={isEditing}
        required
      ></CommentFormTextarea>
      {isEditing ? (
        <EditButtonSection>
          <DeleteCommentButton
            onDeleteComment={() => showModal(modalContent)}
          />
          <CommentButton type="submit" $editing={isEditing}>
            Absenden
          </CommentButton>
        </EditButtonSection>
      ) : (
        <CommentButton type="submit">Absenden</CommentButton>
      )}
    </CommentFormContainer>
  );
}
