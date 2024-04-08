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
export default function Reply({ reply }) {
  const { userImageURL, userName, text, creationDate, _id, isLiked } = reply;
  const { updateComment } = useData();

  const timeElapsed = getTimeElapsed(creationDate);

  return (
    <article>
      <ReplyContainer>
        <ProfilePicture
          src={userImageURL}
          alt="profile picture"
          height={36}
          width={36}
        />
        <ReplyText>
          <ReplyHeader>
            {userName} <ReplyTime> · {creationDate && timeElapsed}</ReplyTime>
          </ReplyHeader>
          <ReplyBody>
            {text}
            <LikeButton
              onLikeComment={() => updateComment(_id, isLiked)}
              checkIfIsLiked={isLiked}
            />
          </ReplyBody>
        </ReplyText>
      </ReplyContainer>
    </article>
  );
}
