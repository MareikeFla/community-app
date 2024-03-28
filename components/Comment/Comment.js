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
import LikeButton from "../LikeButton/LikeButton";
import { useData } from "@/lib/useData";
import { FlexContainer } from "./Comment.styled";

export default function Comment({ comment, mutateComments }) {
  const { userImageURL, userName, text, creationDate, isLiked, _id } = comment;
  const { updateComment, addReply, fetchedComments } = useData();
  const timeElapsed = getTimeElapsed(creationDate);

  const replies = fetchedComments.comments.filter(
    (comment) => comment.parentCommentId === _id
  );
  const [isReplyFormOpen, setIsReplyFormOpen] = useState();

  const handleReplyForm = () => {
    setIsReplyFormOpen((prevState) => !prevState);
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
            {userName}{" "}
            <CommentTime> · {creationDate && timeElapsed}</CommentTime>
          </CommentHeader>
          <CommentBody>{text}</CommentBody>
          <FlexContainer>
            <ReplyButton onClick={handleReplyForm} text="Antworten" />

            <LikeButton
              onLikeComment={() => updateComment(_id, isLiked)}
              checkIfIsLiked={isLiked}
            />
          </FlexContainer>
        </CommentText>
      </CommentContainer>

      {isReplyFormOpen && (
        <ReplyCommentForm onPostReply={(event) => addReply(_id, event)} />
      )}
      <ReplyList replies={replies} />
    </article>
  );
}
