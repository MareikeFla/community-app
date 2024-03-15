import Comment from "../Comment/Comment";
import { List } from "./CommentList.styled";

export default function CommentList({ comments, mutate }) {
  return (
    <List>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Comment comment={comment} mutate={mutate} />
        </li>
      ))}
    </List>
  );
}
