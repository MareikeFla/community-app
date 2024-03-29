import CategoryTag from "../CategoryTag/CategoryTag";
import CommentSection from "../CommentSection/CommentSection";
import DeleteEventButton from "../DeleteEventButton/DeleteEventButton";
import EditEventButton from "../EditEventButton/EditEventButton";
import Map from "../Map";
import { formatDate } from "@/lib/dateHelpers";
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
import { useSession } from "next-auth/react";

import ExpandableText from "./ExpandableText";

import { locationToString } from "@/lib/formatLocation";

export default function EventDetail({ event }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  if (!event) {
    return (
      <Card pageNotFound>
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
    links,
    category,
    comments,
    createdBy,
    isOnlineEvent,
  } = event;
  if (!organization) return null;
  const { organizationName, organizationContact } = organization;
  const { latitude, longitude } = location;

  const formattedStartDate = formatDate(start.date);
  const formattedEndDate = formatDate(end.date);

  return (
    <>
      <Card>
        {createdBy === userId ? (
          <>
            <EditEventButton id={_id} />
            <DeleteEventButton id={_id} />
          </>
        ) : null}
        <EventName>{eventName}</EventName>
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
        <CategoryTag category={category} />
      </Card>
      <CommentSection id={_id} comments={comments} mutateEvent={event.mutate} />
    </>
  );
}
