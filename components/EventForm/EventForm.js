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
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";

export default function EventForm() {
  const handleChange = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleButtonClick = (onClick) => {
    console.log("Button wurde geklickt!");
    if (onClick) {
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (newValue) => {
    setIsChecked(newValue);
  };

  return (
    <EventFormStyled onSubmit={handleSubmit}>
      <FormSection>
        <FormLabel htmlFor="eventName">Event Name*</FormLabel>
        <FormInput
          required
          aria-required="true"
          type="text"
          id="eventName"
          name="evenName"
          value=""
          onChange={handleChange}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie*</FormLabel>
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
            required
            aria-required="true"
            id="startDate"
            name="startDate"
            value=""
            onChange={handleChange}
            placeholder="TT/MM/JJ"
          />
          <FormInputTime
            required
            aria-required="true"
            id="startTime"
            name="startTime"
            value=""
            onChange={handleChange}
            placeholder="HH:MM"
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="End">Ende</FormLabel>
        <FormTimeDateWrapper>
          <FormInput
            id="endDate"
            name="endDate"
            value=""
            onChange={handleChange}
            placeholder="TT/MM/JJ"
          />
          <FormInputTime
            id="endTime"
            name="endTime"
            value=""
            onChange={handleChange}
            placeholder="HH:MM"
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection aria-describedby="Ort des Events">
        <FormLegend>Ort des Events</FormLegend>
        <SubtitleLeft>(Für online Events bitte leer lassen)</SubtitleLeft>
        <FlexContainer addMargin>
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
        <FormLabel htmlFor="cost">Kosten*</FormLabel>
        <FormInput
          id="cost"
          name="cost"
          value=""
          onChange={handleChange}
          required
          aria-required="true"
        />
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="organization">Veranstalter*</FormLabel>
        <FormInput
          type="text"
          id="organization"
          name="organization"
          onChange={handleChange}
          required
          aria-required="true"
        />
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung*</FormLabel>
        <FormDesicriptionField
          id="shortDescription"
          name="shortDescription"
          onChange={handleChange}
          required
          aria-required="true"
        />
        <SubtitleRight>Erscheint in der Event Vorschau</SubtitleRight>
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="longDescription">Beschreibung*</FormLabel>
        <FormDesicriptionField
          id="longDescription"
          name="longDescription"
          onChange={handleChange}
          required
          aria-required="true"
        />
        <SubtitleRight>Erscheint auf der Event Seite</SubtitleRight>
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="linkURL">Link für weitere Infos</FormLabel>
        <FormInput
          type="url"
          id="linkURL"
          name="linkURL"
          onChange={handleChange}
          required
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
          onChange={handleChange}
          required
          aria-required="true"
          placeholder="http://"
        />
      </ImageURLWrapper>
      <FormButtonWrapper>
        <Button color="primary" type="reset" text="Abbrechen" />
        <Button
          color="secondary"
          type="submit"
          onClick={handleButtonClick}
          text="Absenden"
        />
      </FormButtonWrapper>
      <FormInfoText>*Pflichtfeld</FormInfoText>
    </EventFormStyled>
  );
}
