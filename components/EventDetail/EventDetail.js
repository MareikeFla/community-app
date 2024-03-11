import BackButton from "../BackButton/BackButton";
import CategoryTag from "../CategoryTag/CategoryTag";
import CommentSection from "../CommentSection/CommentSection";
import DeleteEventButton from "../DeleteEventButton/DeleteEventButton";
import EditEventButton from "../EditEventButton/EditEventButton";
import Map from "../Map";
import { formatDate } from "@/lib/formatDate";
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

export default function EventDetail({ event, showDeleteModal }) {
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
    comments,
  } = event;
  const { organizationName, organizationContact } = organization;
  const { street, houseNumber, zip, city, latitude, longitude } = location;

  const formattedStartDate = formatDate(start.date);
  const formattedEndDate = formatDate(end.date);

  return (
    <>
      <Card>
        <BackButton />
        <DeleteEventButton id={_id} showDeleteModal={showDeleteModal} />
        <EditEventButton event={event} />
        <EventName>{eventName}</EventName>
        <Description>{longDescription}</Description>
        <InfoWrapper>
          <InfoTitle>Beginn</InfoTitle>
          <Info>
            {formattedStartDate}, {start.time} Uhr
          </Info>
          <InfoTitle>Ende</InfoTitle>
          <Info>
            {formattedEndDate}, {end.time} Uhr
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
      <CommentSection id={_id} comments={comments} />
    </>
  );
}
