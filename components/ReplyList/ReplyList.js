import Reply from "../Reply/Reply";
import { List } from "./ReplyList.styled";

export default function ReplyList({ replies }) {
  if (replies) {
    return (
      <List>
        {replies.map((reply) => (
          <li key={reply._id}>
            <Reply reply={reply} />
          </li>
        ))}
      </List>
    );
  }
}
