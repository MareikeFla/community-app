import BackButton from "../BackButton/BackButton";
import { Card, ErrorMessage } from "./MessageCard.styled";

export default function MessageCard({ children }) {
  return (
    <Card $pageNotFound>
      <ErrorMessage>{children}</ErrorMessage>
      <BackButton />
    </Card>
  );
}
