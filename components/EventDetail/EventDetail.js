import BackButton from "@/components/BackButton/BackButton";
import {
  Card,
  ErrorMessage,
  EventName,
  Description,
  InfoWrapper,
  InfoTitle,
  Info,
  LinkList,
  ListItem,
  ListItemLink,
  ListItemMarker,
} from "./EventDetail.styled";

export default function EventDetail({ event }) {
  if (!event) {
    return (
      <Card pageNotFound>
        <ErrorMessage>Seite nicht gefunden.</ErrorMessage>
        <BackButton />
      </Card>
    );
  }

  const {
    eventName,
    longDescription,
    start,
    end,
    location,
    costs,
    organization,
    links,
  } = event;
  const { organizationName, organizationContact } = organization;

  return (
    <Card>
      <BackButton />
      <EventName>{eventName}</EventName>
      <Description>{longDescription}</Description>
      <InfoWrapper>
        <InfoTitle>Beginn</InfoTitle>
        <Info>
          {start.date}, {start.time} Uhr
        </Info>
        <InfoTitle>Ende</InfoTitle>
        <Info>
          {end.date}, {end.time} Uhr
        </Info>
        <InfoTitle>Ort</InfoTitle>
        <Info>{location.city}</Info>
        <InfoTitle>Kosten</InfoTitle>
        <Info>{costs}</Info>
        <InfoTitle>Veranstalter</InfoTitle>
        <Info>{organizationName}</Info>
        <InfoTitle>Kontakt</InfoTitle>
        <Info>{organizationContact}</Info>
        <InfoTitle>Weitere Infos</InfoTitle>
        <LinkList>
          {links.map((link, index) => (
            <ListItem key={index}>
              <ListItemMarker>&raquo;</ListItemMarker>
              <ListItemLink href={link.url} target="blank">
                {link.linkDescription}
              </ListItemLink>
            </ListItem>
          ))}
        </LinkList>
      </InfoWrapper>
    </Card>
  );
}
