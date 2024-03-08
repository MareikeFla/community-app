import ArrowButton from "../ArrowButton/ArrowButton";
import { Card, Content, Heading, Illustration } from "./WelcomeCard.styled";

export default function WelcomeCard() {
  return (
    <Card>
      <Content>
        <Heading>Entdecke und teile Events mit deiner Community.</Heading>
        <ArrowButton href="/events/new">Event erstellen</ArrowButton>
      </Content>
      <Illustration
        src="/assets/images/illustration_high-five.svg"
        alt="Man and woman high-five"
        width={142}
        height={151}
      />
    </Card>
  );
}
