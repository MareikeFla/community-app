import {
  CommentButton,
  CommentFormContainer,
  CommentFormLabel,
  CommentFormTextarea,
} from "./CommentForm.styled";

export default function CommentForm({ onPostComment }) {
  function handleSubmitComment(event) {
    event.preventDefault();
    onPostComment(event.target.comment.value);
    event.target.reset();
  }
  return (
    <>
      <CommentFormContainer onSubmit={handleSubmitComment}>
        <CommentFormLabel htmlFor="comment">Dein Kommentar</CommentFormLabel>
        <CommentFormTextarea
          id="comment"
          rows={5}
          required
        ></CommentFormTextarea>
        <CommentButton type="submit">Absenden</CommentButton>
      </CommentFormContainer>
    </>
  );
}
