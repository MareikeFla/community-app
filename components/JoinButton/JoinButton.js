import Image from "next/image";
import { StyledJoinButton } from "./JoinButton.styled";

export default function JoinButton({ onJoinEvent, isAttendedByUser }) {
  return (
    <StyledJoinButton onClick={onJoinEvent}>
      Teilnehmen
      {isAttendedByUser ? (
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
    </StyledJoinButton>
  );
}
