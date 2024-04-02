import Comment from "../Comment/Comment";
import { List } from "./CommentList.styled";

export default function CommentList({ comments, mutateComments }) {
  return (
    <List>
      {comments.map((comment) => (
        <li key={comment._id}>
          <Comment comment={comment} mutateComments={mutateComments} />
        </li>
      ))}
    </List>
  );
}
