import {
  EventFormStyled,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckboxWrapper,
  FormDesicriptionField,
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
import { useState } from "react";
import useSWR from "swr";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
export default function EventForm() {
  const { mutate } = useSWR("/api/module/Event");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
    const eventData = Object.fromEntries(formData);

    const response = await fetch("/api/models/Event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      mutate();
    }
  };

  const handleButtonClick = (onClick) => {
    if (onClick) {
      console.log("Button wurde geklickt!");
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (newValue) => {
    setIsChecked(newValue);
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
          //   value=""
          //   onChange={handleEventName}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie *</FormLabel>
        <FormSelect name="category" id="category" required aria-required="true">
          <option value="activism">Aktivismus</option>
          <option value="culture">Kunst & Kultur</option>
          <option value="education">Bildung & Wissen</option>
          <option value="sport">Sport & Fitness</option>
        </FormSelect>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="startDate">Beginn*</FormLabel>
        <FormTimeDateWrapper>
          <FormInput
            // required
            type="date"
            aria-required="true"
            id="startDate"
            name="startDate"
            // value=""
            placeholder="TT/MM/JJ"
          />
          <FormInputTime
            // required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
            // value=""
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
            // value=""
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            // value=""
            placeholder="HH:MM"
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection aria-describedby="Ort des Events">
        <FormLegend>
          Ort des Events
          <SubtitleLeft>(Für Online Events bitte leer lassen)</SubtitleLeft>
        </FormLegend>

        <FlexContainer addmarginbottom>
          <FullWidth>
            <FormLabel htmlFor="street">Straße</FormLabel>
            <FormInput type="text" name="street" id="street" />
          </FullWidth>
          <FixedSize>
            <FormLabel htmlFor="number">Hnr</FormLabel>
            <FormInput type="text" name="number" id="number" />
          </FixedSize>
        </FlexContainer>
        <FlexContainer>
          <FixedSize>
            <FormLabel htmlFor="zip">PLZ</FormLabel>
            <FormInput type="text" name="zip" id="zip" />
          </FixedSize>
          <FullWidth>
            <FormLabel htmlFor="city">Ort</FormLabel>
            <FormInput type="text" name="city" id="city" />
          </FullWidth>
        </FlexContainer>
      </FormSection>
      <FormSection>
        <FormCheckboxWrapper>
          <FormLabel htmlFor="forFree">Kostenlos</FormLabel>
          <SwitchButton isChecked={isChecked} onToggle={handleToggle} />
        </FormCheckboxWrapper>
        {isChecked && (
          <>
            <FormLabel htmlFor="cost">Kosten *</FormLabel>
            <FormInput id="cost" name="cost" required aria-required="true" />
          </>
        )}
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="organization">Veranstalter *</FormLabel>
        <FormInput
          type="text"
          id="organization"
          name="organization"
          required
          aria-required="true"
        />
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung *</FormLabel>
        <FormDesicriptionField
          id="shortDescription"
          name="shortDescription"
          required
          aria-required="true"
        />
        <SubtitleRight addmargintop>
          Erscheint in der Event Vorschau
        </SubtitleRight>
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="longDescription">Beschreibung *</FormLabel>
        <FormDesicriptionField
          id="longDescription"
          name="longDescription"
          required
          aria-required="true"
        />
        <SubtitleRight addmargintop>
          Erscheint auf der Event Seite
        </SubtitleRight>
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="linkURL">Link für weitere Infos</FormLabel>
        <FormInput
          type="url"
          id="linkURL"
          name="linkURL"
          aria-required="true"
          placeholder="http://"
        />
      </FormSection>

      <ImageURLWrapper>
        <FormLabel htmlFor="imageURL">Bild</FormLabel>
        <FormInput
          type="url"
          id="imageURL"
          name="imageURL"
          aria-required="true"
          placeholder="http://"
        />
      </ImageURLWrapper>
      <FormButtonWrapper>
        <Button
          color="primary"
          type="reset"
          text="Abbrechen"
          onClick={handleButtonClick}
        />
        <Button
          color="secondary"
          type="submit"
          onClick={handleButtonClick}
          text="Absenden"
        />
      </FormButtonWrapper>
      <FormInfoText>* Pflichtfeld</FormInfoText>
    </EventFormStyled>
  );
}
