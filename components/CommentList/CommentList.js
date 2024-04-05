import Comment from "../Comment/Comment";
import { Item, List } from "./CommentList.styled";

export default function CommentList({ comments, mutateComments }) {
  return (
    <List>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          mutateComments={mutateComments}
        />
      ))}
    </List>
  );
}
