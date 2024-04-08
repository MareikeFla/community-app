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

export default function Comment({ comment }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { text, creationDate, isLiked, _id, createdBy } = comment;
  const { updateComment, addReply, fetchedComments } = useData();
  const timeElapsed = getTimeElapsed(creationDate);

  const replies = fetchedComments.comments.filter(
    (comment) => comment.parentCommentId === _id
  );
  const [isReplyFormOpen, setIsReplyFormOpen] = useState();

  const handleReplyForm = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  const commentIsLikedByUser = isLiked.includes(userId);

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
          </CommentHeader>
          <CommentBody>{text}</CommentBody>
          <FlexContainer>
            {session && (
              <ReplyButton onClick={handleReplyForm} text="Antworten" />
            )}

            <LikeButton
              userIsLoggedIn={!session}
              onLikeComment={() => updateComment(_id, userId)}
              checkIfIsLiked={commentIsLikedByUser}
              numberOfLikes={isLiked && isLiked.length > 0 ? isLiked.length : 0}
            />
          </FlexContainer>
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
