import CategoryTag from "../CategoryTag/CategoryTag";
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
  const { eventName, shortDescription, start, location, category } = event;
  const { date, time } = start;
  return (
    <Card>
      <PreviewTitle>{eventName}</PreviewTitle>
      <PreviewDescription>{shortDescription}</PreviewDescription>
      <CategoryTag category={category} />
      <Divider />
      <InfoContainer>
        <Info>
          <Icon src="/assets/icons/icon_date.svg" alt="event date icon" />
          {date}
        </Info>
        <Info>
          <Icon src="/assets/icons/icon_time.svg" alt="event time icon" />
          {time}
        </Info>
        <Info>
          <Icon
            src="/assets/icons/icon_location.svg"
            alt="event location icon"
          />
          {location.city || "Online"}
        </Info>
      </InfoContainer>
    </Card>
  );
}
