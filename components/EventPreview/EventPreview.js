import {
  Card,
  Icon,
  InfoContainer,
  Info,
  Divider,
  PreviewTitle,
  PreviewDescription,
} from "./EventPreview.styled";

export default function EventPreview({ event }) {
  return (
    <Card>
      <PreviewTitle>{event.eventName}</PreviewTitle>
      <PreviewDescription>{event.shortDescription}</PreviewDescription>
      <Divider />
      <InfoContainer>
        <Info>
          <Icon src="/assets/icons/icon_date.svg" alt="event date icon" />
          {event.start.date}
        </Info>
        <Info>
          <Icon src="/assets/icons/icon_time.svg" alt="event time icon" />
          {event.start.time}
        </Info>
        <Info>
          <Icon
            src="/assets/icons/icon_location.svg"
            alt="event location icon"
          />
          {event.location.city}
        </Info>
      </InfoContainer>
    </Card>
  );
}
