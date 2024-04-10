import { Card, Message } from "./MessageCard.styled";

export default function MessageCard({ children, hasButton }) {
  return (
    <Card $hasButton={hasButton}>
      <Message>{children}</Message>
    </Card>
  );
}
