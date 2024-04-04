import CategoryTag from "../CategoryTag/CategoryTag";
import CommentSection from "../CommentSection/CommentSection";
import DeleteEventButton from "../DeleteEventButton/DeleteEventButton";
import EditEventButton from "../EditEventButton/EditEventButton";
import Map from "../Map";
import { formatDate } from "@/lib/formatDate";
import {
  Card,
  ErrorMessage,
  EventHeader,
  EventImage,
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
    image,
    links,
    category,
    comments,
    createdBy,
  } = event;
  if (!organization) return null;
  const { organizationName, organizationContact } = organization;
  const { street, houseNumber, zip, city, latitude, longitude } = location;

  const formattedStartDate = formatDate(start.date);
  const formattedEndDate = formatDate(end.date);

  return (
    <>
      {image ? (
        <EventHeader>
          {createdBy === userId ? (
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
      <Card $withImage={image} $userId={userId} $createdBy={createdBy}>
        {createdBy === userId ? (
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
          <Info>
            {!zip && !street && !houseNumber && !city
              ? "Online"
              : `${street || ""} ${houseNumber || ""}${
                  street || houseNumber ? "," : ""
                } ${zip || ""} ${city || ""}`}
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
      <CommentSection id={_id} comments={comments} mutateEvent={event.mutate} />
    </>
  );
}
