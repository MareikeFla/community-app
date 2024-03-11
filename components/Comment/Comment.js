import {
  CommentBody,
  CommentContainer,
  CommentHeader,
  ProfilePicture,
} from "./Comment.styled";

export default function Comment({ comment }) {
  const { userImageURL, userName, text } = comment;
  return (
    <article>
      <CommentContainer>
        <ProfilePicture
          src={userImageURL}
          alt="profile picture"
          height={36}
          width={36}
        />
        <div>
          <CommentHeader>{userName}</CommentHeader>
          <CommentBody>{text}</CommentBody>
        </div>
      </CommentContainer>
    </article>
  );
}
