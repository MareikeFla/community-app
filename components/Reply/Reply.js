import { getTimeElapsed } from "@/lib/getTimeElapsed";
export default function Reply({ reply }) {
  const { userImageURL, userName, text, creationDate } = reply;

  const timeElapsed = getTimeElapsed(reply);
  return (
    <article>
      <ReplyContainer>
        <ProfilePicture
          src={userImageURL}
          alt="profile picture"
          height={36}
          width={36}
        />
        <div>
          <ReplyHeader>
            {userName} <ReplyTime>·{creationDate && timeElapsed}</ReplyTime>
          </ReplyHeader>
          <ReplyBody>{text}</ReplyBody>
        </div>
      </ReplyContainer>
    </article>
  );
}
