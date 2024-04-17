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
import { useSession } from "next-auth/react";
import EditButton from "../EditButton/EditButton";
import CommentForm from "../CommentForm/CommentForm";

export default function Comment({ comment }) {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { text, creationDate, isLiked, _id, createdBy } = comment;
  const { likeComment, addReply, fetchedComments, editComment } = useData();
  const timeElapsed = getTimeElapsed(creationDate);

  const replies = fetchedComments.comments.filter(
    (comment) => comment.parentCommentId === _id
  );

  const handleReplyForm = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  const commentIsLikedByUser = isLiked.includes(userId);
  function handleEditComment() {
    setIsEditingComment(!isEditingComment);
  }

  if (!createdBy) return null;

  return (
    <li>
      <CommentContainer>
        <ProfilePicture
          src={createdBy.image}
          alt="profile picture"
          height={36}
          width={36}
        />
        <CommentText>
          <CommentHeader>
            {createdBy.name}{" "}
            <CommentTime> · {creationDate && timeElapsed}</CommentTime>
            {userId === createdBy._id && (
              <EditButton
                onEdit={handleEditComment}
                isEditing={isEditingComment}
              ></EditButton>
            )}
          </CommentHeader>
          {!isEditingComment ? (
            <CommentBody>{text}</CommentBody>
          ) : (
            <CommentForm
              isEditing={isEditingComment}
              comment={comment}
              onPostComment={(comment) => {
                editComment(_id, comment);
                handleEditComment();
              }}
            />
          )}

          {!isEditingComment && (
            <FlexContainer>
              {session && (
                <ReplyButton onClick={handleReplyForm} text="Antworten" />
              )}

              <LikeButton
                userIsLoggedIn={!session}
                onLikeComment={() => likeComment(_id, userId)}
                checkIfIsLiked={commentIsLikedByUser}
                numberOfLikes={
                  isLiked && isLiked.length > 0 ? isLiked.length : 0
                }
              />
            </FlexContainer>
          )}
        </CommentText>
      </CommentContainer>

      {isReplyFormOpen && (
        <ReplyCommentForm
          onPostReply={(event) => {
            addReply(_id, event, userId);
            handleReplyForm();
          }}
        />
      )}
      <ReplyList replies={replies} />
    </li>
  );
}
