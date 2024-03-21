import Comment from "../Comment/Comment";
import { List } from "./CommentList.styled";

export default function CommentList({ comments, mutateEvent }) {
  return (
    <List>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Comment comment={comment} mutateEvent={mutateEvent} />
        </li>
      ))}
    </List>
  );
}
