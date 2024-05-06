import Image from "next/image";
import { Button, ButtonText } from "./LikeButton.styled";

export default function LikeButton({
  onLikeComment,
  checkIfIsLiked,
  numberOfLikes,
  userIsLoggedIn,
}) {
  console.log(userIsLoggedIn);
  return (
    <Button
      onClick={onLikeComment}
      disabled={!userIsLoggedIn}
      aria-label="gefällt mir Taste"
    >
      {!userIsLoggedIn ? (
        <Image
          src="/assets/icons/icon_heart.svg"
          alt="Herz"
          height={12}
          width={14}
        />
      ) : checkIfIsLiked ? (
        <Image
          src="/assets/icons/icon_heart-filled.svg"
          alt="Herz"
          height={12}
          width={14}
        />
      ) : (
        <Image
          src="/assets/icons/icon_heart.svg"
          alt="Herz"
          height={12}
          width={14}
        />
      )}
      <ButtonText>{numberOfLikes}</ButtonText>
    </Button>
  );
}
