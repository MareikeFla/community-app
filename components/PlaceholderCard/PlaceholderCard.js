import BackButton from "../BackButton/BackButton";
import { Card, ErrorMessage } from "./PlaceholderCard.styled";

export default function PlaceholderCard({ children }) {
  return (
    <Card pageNotFound>
      <ErrorMessage>{children}</ErrorMessage>
      <BackButton />
    </Card>
  );
}
