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
import { useData } from "@/lib/useData";

export default function Comment({ comment, mutateEvent }) {
  const { userImageURL, userName, text, creationDate, isLiked, _id } = comment;
  const { updateComment } = useData();

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
        <LikeButton
          onLikeComment={() => updateComment(_id, isLiked, mutateEvent)}
          checkIfIsLiked={isLiked}
        />
      </CommentText>
    </CommentContainer>
  );
}
