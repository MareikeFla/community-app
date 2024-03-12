import {
  EventFormStyled,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckboxWrapper,
  FormDescriptionField,
  FormButtonWrapper,
  FormLegend,
  FormInfoText,
  ImageURLWrapper,
  FormTimeDateWrapper,
  FlexContainer,
  FormInputTime,
  FixedSize,
  FullWidth,
  SubtitleLeft,
  SubtitleRight,
} from "./EventForm.styled";

import { useState, useEffect } from "react";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import { useRouter } from "next/router";

// Component definition for EventForm, receiving updateDatabase function and event object(When called from edit page) as props

export default function EventForm({ updateDatabase, event: editEvent }) {
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extracting form values into a structured object
    const eventTarget = event.target;
    const eventData = {
      eventName: eventTarget.eventName.value,
      start: {
        date: eventTarget.startDate.value,
        time: eventTarget.startTime.value,
      },
      end: {
        date: eventTarget.endDate.value,
        time: eventTarget.endTime.value,
      },
      location: {
        city: eventTarget.city.value,
        zip: eventTarget.zip.value,
        street: eventTarget.street.value,
        houseNumber: eventTarget.houseNumber.value,
      },
      category: eventTarget.category.value,
      organization: {
        organizationName: eventTarget.organization.value,
        organizationContact: eventTarget.contact.value,
      },
      costs: eventTarget.cost.value,
      shortDescription: eventTarget.shortDescription.value,
      longDescription: eventTarget.longDescription.value,
      image: {
        src: eventTarget.imageURL.value,
        alt: eventTarget.alt.value,
      },
      links: [
        {
          url: eventTarget.linkURL.value,
          linkDescription: eventTarget.linkDescription.value,
        },
      ],
    };
    const newEventID = await updateDatabase(eventData);
    event.target.reset();
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    editEvent?.costs === "Kostenlos"
  );
  const [costs, setCosts] = useState(
    editEvent
      ? editEvent.costs === "Kostenlos"
        ? "Kostenlos"
        : editEvent.costs
      : ""
  );

  useEffect(() => {
    if (isFreeOfCharge) {
      setCosts("Kostenlos");
    } else if (editEvent) {
      setCosts(editEvent.costs);
    } else {
      setCosts("");
    }
  }, [isFreeOfCharge, editEvent]);

  const handleToggle = () => {
    setIsFreeOfCharge(!isFreeOfCharge);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <EventFormStyled onSubmit={handleSubmit}>
      <FormSection>
        <FormLabel htmlFor="eventName">Event Name *</FormLabel>
        <FormInput
          required
          aria-required="true"
          type="text"
          id="eventName"
          name="eventName"
          defaultValue={editEvent ? editEvent.eventName : ""}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie *</FormLabel>
        <FormSelect
          name="category"
          id="category"
          required
          aria-required="true"
          defaultValue={editEvent ? editEvent.category : ""}
        >
          <option value="Aktivismus">Aktivismus</option>
          <option value="Kunst & Kultur">Kunst & Kultur</option>
          <option value="Bildung & Wissen">Bildung & Wissen</option>
          <option value="Sport & Fitness">Sport & Fitness</option>
        </FormSelect>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="startDate">Beginn*</FormLabel>
        <FormTimeDateWrapper>
          <FormInput
            required
            type="date"
            aria-required="true"
            id="startDate"
            name="startDate"
            defaultValue={
              editEvent && editEvent.start ? editEvent.start.date : ""
            }
          />
          <FormInputTime
            required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
            defaultValue={
              editEvent && editEvent.start ? editEvent.start.time : ""
            }
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="End">Ende</FormLabel>
        <FormTimeDateWrapper>
          <FormInput
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={editEvent && editEvent.end ? editEvent.end.date : ""}
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={editEvent && editEvent.end ? editEvent.end.time : ""}
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection aria-describedby="Ort des Events">
        <FormLegend>
          Ort des Events
          <SubtitleLeft>(Für Online Events bitte leer lassen)</SubtitleLeft>
        </FormLegend>
        <FlexContainer $addmarginbottom>
          <FullWidth>
            <FormLabel htmlFor="street">Straße</FormLabel>
            <FormInput
              type="text"
              name="street"
              id="street"
              defaultValue={
                editEvent && editEvent.location ? editEvent.location.street : ""
              }
            />
          </FullWidth>
          <FixedSize>
            <FormLabel htmlFor="houseNumber">Hnr</FormLabel>
            <FormInput
              type="text"
              name="houseNumber"
              id="houseNumber"
              defaultValue={
                editEvent && editEvent.location
                  ? editEvent.location.houseNumber
                  : ""
              }
            />
          </FixedSize>
        </FlexContainer>
        <FlexContainer>
          <FixedSize>
            <FormLabel htmlFor="zip">PLZ</FormLabel>
            <FormInput
              type="text"
              name="zip"
              id="zip"
              defaultValue={
                editEvent && editEvent.location ? editEvent.location.zip : ""
              }
            />
          </FixedSize>
          <FullWidth>
            <FormLabel htmlFor="city">Ort</FormLabel>
            <FormInput
              type="text"
              name="city"
              id="city"
              defaultValue={
                editEvent && editEvent.location ? editEvent.location.city : ""
              }
            />
          </FullWidth>
        </FlexContainer>
      </FormSection>
      <FormSection>
        <FormCheckboxWrapper>
          <FormLabel htmlFor="forFree">Kostenlos</FormLabel>
          <SwitchButton isChecked={isFreeOfCharge} toggleCosts={handleToggle} />
        </FormCheckboxWrapper>
        <FormLabel htmlFor="cost">Kosten *</FormLabel>
        <FormInput
          id="cost"
          name="cost"
          required
          aria-required="true"
          disabled={isFreeOfCharge}
          value={costs}
          onChange={(event) => !isFreeOfCharge && setCosts(event.target.value)}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="organization">Veranstalter *</FormLabel>
        <FormInput
          type="text"
          id="organization"
          name="organization"
          required
          aria-required="true"
          defaultValue={
            editEvent && editEvent.organization
              ? editEvent.organization.organizationName
              : ""
          }
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="contact">Kontakt *</FormLabel>
        <FormInput
          type="text"
          id="contact"
          name="contact"
          required
          aria-required="true"
          defaultValue={
            editEvent && editEvent.organization
              ? editEvent.organization.organizationContact
              : ""
          }
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung *</FormLabel>
        <FormDescriptionField
          maxLength="120"
          id="shortDescription"
          name="shortDescription"
          required
          aria-required="true"
          defaultValue={editEvent ? editEvent.shortDescription : ""}
        />
        <SubtitleRight>Erscheint in der Event Vorschau</SubtitleRight>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="longDescription">Beschreibung *</FormLabel>
        <FormDescriptionField
          id="longDescription"
          name="longDescription"
          required
          aria-required="true"
          defaultValue={editEvent ? editEvent.longDescription : ""}
        />
        <SubtitleRight>Erscheint auf der Event Seite</SubtitleRight>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="linkURL">Link für weitere Infos</FormLabel>
        <FormInput
          type="url"
          id="linkURL"
          name="linkURL"
          $addmarginbottom
          placeholder="http://"
          defaultValue={
            editEvent && editEvent.links && editEvent.links.length > 0
              ? editEvent.links[0].url
              : ""
          }
        />
        <FormLabel htmlFor="linkDescription">Link Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="linkDescription"
          name="linkDescription"
          placeholder="Link Beschreibung"
          defaultValue={
            editEvent && editEvent.links && editEvent.links.length > 0
              ? editEvent.links[0].linkDescription
              : ""
          }
        />
      </FormSection>
      <ImageURLWrapper>
        <FormLabel htmlFor="imageURL">Bild</FormLabel>
        <FormInput
          type="url"
          id="imageURL"
          name="imageURL"
          placeholder="http://"
          $addmarginbottom
          defaultValue={editEvent && editEvent.image ? editEvent.image.src : ""}
        />
        <FormLabel htmlFor="alt">Bild Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="alt"
          name="alt"
          placeholder="Beschreibe dein Bild"
          defaultValue={editEvent && editEvent.image ? editEvent.image.alt : ""}
        />
      </ImageURLWrapper>
      <FormButtonWrapper>
        <Button
          color="primary"
          type="button"
          text="Abbrechen"
          onClick={handleCancel}
        />
        <Button color="secondary" type="submit" text="Absenden" />
      </FormButtonWrapper>
      <FormInfoText>* Pflichtfeld</FormInfoText>
    </EventFormStyled>
  );
}
