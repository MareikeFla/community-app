import {
  ReplyCommentFormContainer,
  ReplyCommentFormLabel,
  ReplyCommentFormTextarea,
  JustifyRight,
} from "./ReplyCommentForm.styled";
import Button from "../Button/Button";
import { FlexContainer } from "../Comment/Comment.styled";

export default function ReplyCommentForm({ parentComment, onPostReply }) {
  const { addComment } = useData();
  const handleReplyFormSubmit = (event) => {
    event.preventDefault();
    const replyText = event.target.reply.value;
    if (onPostReply) {
      addComment(id, replyText, parentComment);
      console.log("test");
    }
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
