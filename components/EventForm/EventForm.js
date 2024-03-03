import {
  EventFormStyled,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckboxWrapper,
  FormDesicriptionField,
  CancelButton,
  SubmitButton,
  FormButtonWrapper,
  FormLegend,
  FormInfoText,
  ImageURLWrapper,
  FormTimeDateWrapper,
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./EventForm.styled";
import { useState } from "react";
import { Subtitle } from "./EventForm.styled";

export default function EventForm() {
  const handleChange = () => {};

  const handleSubmit = () => {};

  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
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
          <FormInput
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
          <FormInput
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
        <Subtitle>(Für online Events bitte leer lassen)</Subtitle>
        <div>
          <FormLabel htmlFor="street">Straße</FormLabel>
          <FormInput type="text" name="street" id="street" />

          <FormLabel htmlFor="number">Hnr</FormLabel>
          <FormInput type="text" name="number" id="number" />
        </div>
        <FormLabel htmlFor="zip">PLZ</FormLabel>
        <FormInput type="text" name="zip" id="zip" />

        <FormLabel htmlFor="city">Ort</FormLabel>
        <FormInput type="text" name="city" id="city" />
      </FormSection>
      <FormSection>
        <FormCheckboxWrapper>
          <FormLabel htmlFor="forFree">Kostenlos</FormLabel>
          <SwitchContainer>
            <SwitchInput
              htmlFor="switch"
              checked={isActive}
              onChange={toggleSwitch}
            />
            <SwitchBackground />
            <SwitchHandle isActive={isActive} />
          </SwitchContainer>
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
        <Subtitle>Erscheint in der Event Vorschau</Subtitle>
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
        <Subtitle>Erscheint auf der Event Seite</Subtitle>
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
        <CancelButton type="reset">Abbrechen</CancelButton>
        <SubmitButton type="submit">Absenden</SubmitButton>
      </FormButtonWrapper>
      <FormInfoText>*Pflichtfeld</FormInfoText>
    </EventFormStyled>
  );
}
