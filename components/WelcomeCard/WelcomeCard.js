import ArrowButton from "../ArrowButton/ArrowButton";
import ArrowLink from "../ArrowButton/ArrowLink";
import {
  Card,
  Content,
  Heading,
  Illustration,
  LinksContainer,
} from "./WelcomeCard.styled";
import { signIn, useSession } from "next-auth/react";

export default function WelcomeCard() {
  const { data: session } = useSession();

  const loggedIn = () => !!session;

  console.log(loggedIn());

  return (
    <Card>
      {session ? (
        <Content $loggedIn={loggedIn()}>
          <Heading>Willkommen, {session.user.name}!</Heading>
          <p>Was möchtest du tun?</p>
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
