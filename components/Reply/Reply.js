import { getTimeElapsed } from "@/lib/getTimeElapsed";
import {
  ReplyContainer,
  ProfilePicture,
  ReplyHeader,
  ReplyTime,
  ReplyBody,
  ReplyText,
} from "./Reply.styled";
import { useData } from "@/lib/useData";
import LikeButton from "../LikeButton/LikeButton";
import { useSession } from "next-auth/react";
import EditCommentButton from "../EditCommentButton/EditCommentButton";
import CommentForm from "../CommentForm/CommentForm";
import { useState } from "react";

export default function Reply({ reply }) {
  const { data: session } = useSession();
  const [isEditingReply, setIsEditingReply] = useState(false);
  const userId = session?.user.id;
  const { text, creationDate, _id, isLiked, createdBy } = reply;
  const { likeComment, editComment } = useData();

  const replyIsLikedByUser = isLiked.includes(userId);
  const timeElapsed = getTimeElapsed(creationDate);

  return (
    <article>
      <ReplyContainer>
        <ProfilePicture
          src={createdBy.image}
          alt="Profilbild"
          height={36}
          width={36}
        />
        <ReplyText>
          <ReplyHeader>
            {createdBy.name}{" "}
            <ReplyTime> · {creationDate && timeElapsed}</ReplyTime>
            {userId === createdBy._id && (
              <EditCommentButton
                onEditComment={() => setIsEditingReply(!isEditingReply)}
                isEditing={isEditingReply}
              ></EditCommentButton>
            )}
          </ReplyHeader>
          <ReplyBody>
            {!isEditingReply ? (
              <>
                <p>{text}</p>
                <LikeButton
                  userIsLoggedIn={!session}
                  onLikeComment={() => likeComment(_id, userId)}
                  checkIfIsLiked={replyIsLikedByUser}
                  numberOfLikes={
                    isLiked && isLiked.length > 0 ? isLiked.length : 0
                  }
                />
              </>
            ) : (
              <CommentForm
                isEditing={isEditingReply}
                comment={reply}
                onPostComment={(comment) => {
                  editComment(_id, comment);
                  setIsEditingReply(!isEditingReply);
                }}
              />
            )}
          </ReplyBody>
        </ReplyText>
      </ReplyContainer>
    </article>
  );
}
