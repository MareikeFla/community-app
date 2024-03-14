import { getTimeElapsed } from "@/lib/getTimeElapsed";
import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  CommentText,
  CommentTime,
  ProfilePicture,
} from "./Comment.styled";
import LikeButton from "../LikeButton/LikeButton";

export default function Comment({ comment }) {
  const { userImageURL, userName, text, creationDate } = comment;

  const timeElapsed = getTimeElapsed(creationDate);

  return (
    <CommentContainer>
      <ProfilePicture
        src={userImageURL}
        alt="profile picture"
        height={36}
        width={36}
      />
      <CommentText>
        <CommentHeader>
          {userName} <CommentTime>·{creationDate && timeElapsed}</CommentTime>
        </CommentHeader>
        <CommentBody>{text}</CommentBody>
        <LikeButton />
      </CommentText>
    </CommentContainer>
  );
}
