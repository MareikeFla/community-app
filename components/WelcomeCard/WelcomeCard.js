import ArrowButton from "../ArrowButton/ArrowButton";
import ArrowLink from "../ArrowButton/ArrowLink";
import {
  Card,
  Content,
  Heading,
  Illustration,
  LinksContainer,
  Paragraph,
} from "./WelcomeCard.styled";
import { signIn, useSession } from "next-auth/react";

export default function WelcomeCard() {
  const { data: session } = useSession();

  return (
    <Card $loggedIn={session}>
      {session ? (
        <Content>
          <Heading $loggedIn>Willkommen, {session.user.name}!</Heading>
          <Paragraph>Was möchtest du machen?</Paragraph>
          <LinksContainer>
            <ArrowLink href="/events/search">Event finden</ArrowLink>
            <ArrowLink href="/events/new">Event teilen</ArrowLink>
          </LinksContainer>
        </Content>
      ) : (
        <>
          <Content>
            <Heading>Entdecke und teile Events mit deiner Community.</Heading>
            <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
          </Content>
          <Illustration
            src="/assets/images/illustration_high-five.svg"
            alt="Man and woman high-five"
            width={142}
            height={151}
          />
        </>
      )}
    </Card>
  );
}
