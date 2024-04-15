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
import { formatDate } from "@/lib/dateHelpers";

export default function EventPreview({ event }) {
  const { eventName, shortDescription, start, location, category } = event;
  const { date, time } = start;
  const formattedDate = formatDate(date);
  return (
    <Card>
      <PreviewTitle>{eventName}</PreviewTitle>
      <PreviewDescription>{shortDescription}</PreviewDescription>
      <CategoryTag category={category} />
      <Divider />
      <InfoContainer>
        <Info>
          <Icon
            src="/assets/icons/icon_date.svg"
            alt="Veranstaltungs Kalender Symbol"
          />
          {formattedDate}
        </Info>
        <Info>
          <Icon
            src="/assets/icons/icon_time.svg"
            alt="Veranstaltungs Uhr Symbol"
          />
          {time}
        </Info>
        <Info>
          <Icon
            src="/assets/icons/icon_location.svg"
            alt="Veranstaltungs Ort Symbol"
          />
          {location.city || "Online"}
        </Info>
      </InfoContainer>
    </Card>
  );
}
