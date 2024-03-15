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

export default function Comment({ comment, mutate }) {
  const { userImageURL, userName, text, creationDate, isLiked, _id } = comment;
  const [checkIfIsLiked, setCheckIfIsLiked] = useState(isLiked);

  const timeElapsed = getTimeElapsed(creationDate);

  async function handleLikeComment() {
    const response = await fetch(`/api/comments/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        isLiked: !checkIfIsLiked,
      }),
    });

    if (response.ok) {
      setCheckIfIsLiked(!checkIfIsLiked);
      mutate();
    }
  }

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
          onLikeComment={handleLikeComment}
          checkIfIsLiked={checkIfIsLiked}
        />
      </CommentText>
    </CommentContainer>
  );
}
