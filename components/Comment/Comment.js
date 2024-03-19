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
import { useState } from "react";
import { useData } from "@/lib/useData";

export default function Comment({ comment, mutate }) {
  const { userImageURL, userName, text, creationDate, isLiked, _id } = comment;
  const [checkIfIsLiked, setCheckIfIsLiked] = useState(isLiked);
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
          onLikeComment={() =>
            updateComment(_id, checkIfIsLiked, setCheckIfIsLiked, mutate)
          }
          checkIfIsLiked={checkIfIsLiked}
        />
      </CommentText>
    </CommentContainer>
  );
}
