import { useGetTimeElapsed } from "@/lib/useGetTimeElapsed";
import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  CommentTime,
  ProfilePicture,
} from "./Comment.styled";

export default function Comment({ comment }) {
  const { userImageURL, userName, text, creationDate } = comment;

  const timeElapsed = useGetTimeElapsed(creationDate);

  return (
    <article>
      <CommentContainer>
        <ProfilePicture
          src={userImageURL}
          alt="profile picture"
          height={36}
          width={36}
        />
        <div>
          <CommentHeader>
            {userName} <CommentTime>·{creationDate && timeElapsed}</CommentTime>
          </CommentHeader>
          <CommentBody>{text}</CommentBody>
        </div>
      </CommentContainer>
    </article>
  );
}
