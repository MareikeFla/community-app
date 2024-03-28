import {
  ReplyCommentFormContainer,
  ReplyCommentFormLabel,
  ReplyCommentFormTextarea,
  JustifyRight,
} from "./ReplyCommentForm.styled";
import Button from "../Button/Button";

export default function ReplyCommentForm({ onPostReply }) {
  const handleReplyFormSubmit = (event) => {
    event.preventDefault();
    const replyText = event.target.reply.value;
    onPostReply(replyText);
    event.target.reset();
  };

  return (
    <ReplyCommentFormContainer onSubmit={handleReplyFormSubmit}>
      <ReplyCommentFormLabel htmlFor="reply">
        Deine Antwort
      </ReplyCommentFormLabel>
      <ReplyCommentFormTextarea
        id="reply"
        rows={5}
        required
      ></ReplyCommentFormTextarea>
      <JustifyRight>
        <Button color="primary" type="submit" text="Absenden"></Button>
      </JustifyRight>
    </ReplyCommentFormContainer>
  );
}
