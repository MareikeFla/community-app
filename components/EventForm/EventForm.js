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

export default function EventForm({ updateDatabase, event }) {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    updateDatabase(eventData);
    event.target.reset();
    router.push("/");
  };

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    event?.costs === "Kostenlos"
  );
  const [costs, setCosts] = useState(
    event ? (event.costs === "Kostenlos" ? "Kostenlos" : event.costs) : ""
  );

  useEffect(() => {
    if (isFreeOfCharge) {
      setCosts("Kostenlos");
    } else if (event) {
      setCosts(event.costs);
    } else {
      setCosts(""); // Set default or keep previous value
    }
  }, [isFreeOfCharge, event]);

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
          defaultValue={event ? event.eventName : ""}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie *</FormLabel>
        <FormSelect
          name="category"
          id="category"
          required
          aria-required="true"
          defaultValue={event ? event.category : ""}
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
            defaultValue={event && event.start ? event.start.date : ""}
          />
          <FormInputTime
            required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
            defaultValue={event && event.start ? event.start.time : ""}
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
            defaultValue={event && event.end ? event.end.date : ""}
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={event && event.end ? event.end.time : ""}
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
                event && event.location ? event.location.street : ""
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
                event && event.location ? event.location.houseNumber : ""
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
              defaultValue={event && event.location ? event.location.zip : ""}
            />
          </FixedSize>
          <FullWidth>
            <FormLabel htmlFor="city">Ort</FormLabel>
            <FormInput
              type="text"
              name="city"
              id="city"
              defaultValue={event && event.location ? event.location.city : ""}
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
            event && event.organization
              ? event.organization.organizationName
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
            event && event.organization
              ? event.organization.organizationContact
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
          defaultValue={event ? event.shortDescription : ""}
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
          defaultValue={event ? event.longDescription : ""}
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
            event && event.links && event.links.length > 0
              ? event.links[0].url
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
            event && event.links && event.links.length > 0
              ? event.links[0].linkDescription
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
          defaultValue={event && event.image ? event.image.src : ""}
        />
        <FormLabel htmlFor="alt">Bild Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="alt"
          name="alt"
          placeholder="Beschreibe dein Bild"
          defaultValue={event && event.image ? event.image.alt : ""}
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
