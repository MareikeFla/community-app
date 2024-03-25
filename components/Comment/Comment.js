import { getTimeElapsed } from "@/lib/getTimeElapsed";
import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  CommentText,
  CommentTime,
  ProfilePicture,
} from "./Comment.styled";

import ReplyButton from "../ReplyButton/ReplyButton";
import ReplyCommentForm from "../ReplyCommentForm/ReplyCommentForm";
import { useState } from "react";
import ReplyList from "../ReplyList/ReplyList";
import { useEffect } from "react";
import LikeButton from "../LikeButton/LikeButton";
import { useData } from "@/lib/useData";

export default function Comment({ comment, onPostReply, mutateEvent }) {
  const { userImageURL, userName, text, creationDate, isLiked, _id } = comment;
  const { updateComment } = useData();

  const timeElapsed = getTimeElapsed(creationDate);

  const [replies, setReplies] = useState([]);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState();

  const handleReplyForm = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  const handlePostReply = (replyText) => {
    // Funktion zum Posten einer Antwort für diesen Kommentar
    // Implementieren Sie diese Funktion entsprechend Ihrer Anforderungen
    console.log(onPostReply);
    onPostReply(replyText, commentId);
  };

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
      <div>
        <CommentHeader>
          {userName} <CommentTime>·{creationDate && timeElapsed}</CommentTime>
        </CommentHeader>
        <CommentBody>{text}</CommentBody>
        <ReplyButton onClick={handleReplyForm} text="Antworten" />
      </div>
      <ReplyList replies={replies} />
      {isReplyFormOpen && (
        <ReplyCommentForm
          parentCommentId={comment._id}
          onPostReply={handlePostReply}
        />
      )}
    </CommentContainer>
  );
}
