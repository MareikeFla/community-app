import {
  CommentButton,
  CommentFormContainer,
  CommentFormLabel,
  CommentFormTextarea,
} from "./CommentForm.styled";

export default function CommentForm({
  onPostComment,
  isEditing,
  comment = {},
}) {
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
      <CommentButton type="submit" $editing={isEditing}>
        Absenden
      </CommentButton>
    </CommentFormContainer>
  );
}
