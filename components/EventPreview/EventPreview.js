import A11yIcons from "../A11yIcons/A11yIcons";
import CategoryTags from "../CategoryTags/CategoryTags";
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
  const {
    image,
    eventName,
    shortDescription,
    start,
    location,
    category,
    subCategories,
    a11yIcons,
  } = event;
  const { date, time } = start;
  const formattedDate = formatDate(date);
  const hasA11yIcons = !!a11yIcons && a11yIcons.length > 0;

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
        <CategoryTags category={category} subCategories={subCategories} />
        <A11yIcons a11yIcons={a11yIcons} />
        <Divider $hasA11yIcons={hasA11yIcons} />
        <InfoContainer>
          <Info>
            <Icon src="/assets/icons/icon_date.svg" alt="event date icon" />
            {formattedDate}
          </Info>
          {time && (
            <Info>
              <Icon src="/assets/icons/icon_time.svg" alt="event time icon" />
              {time}
            </Info>
          )}
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
