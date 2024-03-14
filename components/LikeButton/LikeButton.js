import Image from "next/image";
import { useState } from "react";
import { Button, ButtonText } from "./LikeButton.styled";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Button onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
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
      <ButtonText>{isLiked ? "1" : "0"}</ButtonText>
    </Button>
  );
}
