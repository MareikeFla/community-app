import { Card, Message } from "./MessageCard.styled";

export default function MessageCard({ children }) {
  return (
    <Card $pageNotFound>
      <Message>{children}</Message>
    </Card>
  );
}
