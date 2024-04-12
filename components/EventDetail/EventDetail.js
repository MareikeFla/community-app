import CategoryTag from "../CategoryTag/CategoryTag";
import CommentSection from "../CommentSection/CommentSection";
import DeleteEventButton from "../DeleteEventButton/DeleteEventButton";
import EditEventButton from "../EditEventButton/EditEventButton";
import Map from "../Map";
import { formatDate } from "@/lib/dateHelpers";
import {
  Card,
  ErrorMessage,
  EventHeader,
  EventImage,
  EventName,
  InfoWrapper,
  InfoTitle,
  Info,
  LinkList,
  ListItem,
  ListItemLink,
  ListItemMarker,
  ButtonWrapper,
  AttendeeWrapper,
} from "./EventDetail.styled";
import { useSession } from "next-auth/react";
import ExpandableText from "./ExpandableText";
import { locationToString } from "@/lib/formatLocation";
import JoinButton from "../JoinButton/JoinButton";
import { useData } from "@/lib/useData";

export default function EventDetail({ event, mutateEvent }) {
  const { joinEvent } = useData();
  const { data: session } = useSession();
  const userId = session?.user.id || null;
  if (!event) {
    return (
      <Card $pageNotFound>
        <ErrorMessage>Seite nicht gefunden.</ErrorMessage>
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
    image,
    links,
    category,
    isOnlineEvent,
    isAttendedByUser,
    attendeeCount,
  } = event;

  if (!organization) return null;
  const { organizationName, organizationContact } = organization;
  const { latitude, longitude } = location;
  const formattedStartDate = formatDate(start.date);
  const formattedEndDate = formatDate(end.date);

  return (
    <>
      {image ? (
        <EventHeader>
          {event.createdBy === userId ? (
            <>
              <EditEventButton id={_id} />
              <DeleteEventButton id={_id} />
            </>
          ) : null}
          <EventName $withImage={image}>{eventName}</EventName>
          <EventImage
            src={image.url}
            alt={eventName}
            fill
            sizes="100vw 100vh"
            priority
          />
        </EventHeader>
      ) : null}
      <Card $withImage={image} $userId={userId} $createdBy={event.createdBy}>
        {event.createdBy === userId ? (
          <>
            <EditEventButton id={_id} />
            <DeleteEventButton id={_id} />
          </>
        ) : null}
        {!image && <EventName>{eventName}</EventName>}
        <ExpandableText text={longDescription} />
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
          <Info>{isOnlineEvent ? "Online" : locationToString(location)}</Info>
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
        <ButtonWrapper>
          <CategoryTag category={category} />
          {session && (
            <JoinButton
              onJoinEvent={() => joinEvent(userId, _id, mutateEvent)}
              isAttendedByUser={isAttendedByUser}
            />
          )}
        </ButtonWrapper>
        <AttendeeWrapper>{attendeeCount} Teilnehmende</AttendeeWrapper>
      </Card>
      <CommentSection id={_id} />
    </>
  );
}
