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
import { FlexContainer } from "./Comment.styled";

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
    onPostReply(replyText, _id);
  };

  return (
    <article>
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
          <FlexContainer>
            <ReplyButton onClick={handleReplyForm} text="Antworten" />

            <LikeButton
              onLikeComment={() => updateComment(_id, isLiked, mutateEvent)}
              checkIfIsLiked={isLiked}
            />
          </FlexContainer>
        </CommentText>
      </CommentContainer>

      <ReplyList replies={replies} />
      {isReplyFormOpen && (
        <ReplyCommentForm
          parentCommentId={comment._id}
          onPostReply={handlePostReply}
        />
      )}
    </article>
  );
}
