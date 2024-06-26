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
import EditButton from "../EditButton/EditButton";
import CommentForm from "../CommentForm/CommentForm";
import { useState } from "react";
import { FlexContainer } from "./Reply.styled";
import { UserName } from "../Comment/Comment.styled";

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
            <FlexContainer $wrap="wrap">
              <UserName> {createdBy.name}</UserName>
              <ReplyTime> · {creationDate && timeElapsed}</ReplyTime>
            </FlexContainer>
            {userId === createdBy._id && (
              <EditButton
                onEdit={() => setIsEditingReply(!isEditingReply)}
                isEditing={isEditingReply}
              />
            )}
          </ReplyHeader>
          <ReplyBody>
            {!isEditingReply ? (
              <>
                <p>{text}</p>
                <LikeButton
                  userIsLoggedIn={session ? true : false}
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
