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
    end,
    location,
    category,
    subCategories,
    a11yIcons,
  } = event;

  const hasA11yIcons = !!a11yIcons && a11yIcons.length > 0;
  const { date: startDate, time: startTime } = start;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate =
    end && end.date !== start.date ? formatDate(end.date) : null;

  return (
    <>
      {image && image.url !== "" && (
        <ImageContainer>
          <EventImage
            src={image?.url}
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
            {formattedStartDate} {formattedEndDate && <>- {formattedEndDate}</>}
          </Info>
          {startTime && (
            <Info>
              <Icon src="/assets/icons/icon_time.svg" alt="event time icon" />
              {startTime}
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
