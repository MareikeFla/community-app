import { StyledAddEventButton } from "../AddEventButton/AddEventButton.styled";
import Link from "next/link";

export default function AddEventButton() {
  return (
    <StyledAddEventButton>
      <Link href="/events/new">
        <img src="assets/icons/icon_plus.svg" alt="Add Event" />
      </Link>
    </StyledAddEventButton>
  );
}
