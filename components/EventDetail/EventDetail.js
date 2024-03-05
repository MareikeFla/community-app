import BackButton from "../BackButton/BackButton";
import CategoryTag from "../CategoryTag/CategoryTag";
import DeleteEventButton from "../DeleteEventButton/DeleteEventButton";
import Map from "../Map";
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
    _id,
    eventName,
    longDescription,
    start,
    end,
    location,
    costs,
    organization,
    links,
    category,
  } = event;
  const { organizationName, organizationContact } = organization;
  const { street, houseNumber, zip, city, latitude, longitude } = location;

  return (
    <Card>
      <BackButton />
      <DeleteEventButton id={_id} />
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
        <Info>
          {zip && street && houseNumber && city
            ? `${street} ${houseNumber}, ${zip}, ${city}`
            : "Online"}
        </Info>
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
        {longitude && latitude && <Map event={event} />}
      </InfoWrapper>
      <CategoryTag category={category} />
    </Card>
  );
}
