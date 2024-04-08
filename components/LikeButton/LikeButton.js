import Image from "next/image";
import { Button, ButtonText } from "./LikeButton.styled";

export default function LikeButton({
  onLikeComment,
  checkIfIsLiked,
  numberOfLikes,
  userIsLoggedIn,
}) {
  return (
    <Button onClick={onLikeComment} disabled={userIsLoggedIn}>
      {checkIfIsLiked ? (
        <Image
          src="/assets/icons/icon_heart-filled.svg"
          alt="heart"
          height={12}
          width={14}
        />
      ) : (
        <Image
          src="/assets/icons/icon_heart.svg"
          alt="heart"
          height={12}
          width={14}
        />
      )}
      <ButtonText>{numberOfLikes}</ButtonText>
    </Button>
  );
}
