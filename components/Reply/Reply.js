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

export default function Reply({ reply }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { text, creationDate, _id, isLiked, createdBy } = reply;
  const { updateComment } = useData();

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
          </ReplyHeader>
          <ReplyBody>
            {text}
            <LikeButton
              userIsLoggedIn={!session}
              onLikeComment={() => updateComment(_id, userId)}
              checkIfIsLiked={replyIsLikedByUser}
              numberOfLikes={isLiked && isLiked.length > 0 ? isLiked.length : 0}
            />
          </ReplyBody>
        </ReplyText>
      </ReplyContainer>
    </article>
  );
}
