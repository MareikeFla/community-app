import CategoryTag from "../CategoryTag/CategoryTag";
import {
  Card,
  ImageContainer,
  EventImage,
  Icon,
  InfoContainer,
  Info,
  Divider,
  PreviewTitle,
  PreviewDescription,
} from "./EventPreview.styled";
import { formatDate } from "@/lib/dateHelpers";

export default function EventPreview({ event }) {
  const { image, eventName, shortDescription, start, location, category } =
    event;
  const { date, time } = start;
  const formattedDate = formatDate(date);
  return (
    <>
      {image && (
        <ImageContainer>
          <EventImage
            src={image.url}
            alt={eventName}
            fill
            sizes="100vw 100vh"
          />
        </ImageContainer>
      )}
      <Card $withImage={image}>
        <PreviewTitle>{eventName}</PreviewTitle>
        <PreviewDescription>{shortDescription}</PreviewDescription>
        <CategoryTag category={category} />
        <Divider />
        <InfoContainer>
          <Info>
            <Icon src="/assets/icons/icon_date.svg" alt="event date icon" />
            {formattedDate}
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
    </>
  );
}
