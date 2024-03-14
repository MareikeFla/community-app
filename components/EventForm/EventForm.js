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
  CharacterCounter,
} from "./EventForm.styled";
import { useState } from "react";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import { useRouter } from "next/router";
export default function EventForm({ editFormData }) {
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
      links: [
        {
          url: eventTarget.linkURL.value,
          linkDescription: eventTarget.linkDescription.value,
        },
      ],
    };
    // try {
    const response = editFormData(eventData);
    console.log(response);
    const { newEventId } = await response.json();
    console.log(newEventId);
    router.push(`/events/${newEventId}`);

    // } catch (error) {
    //   console.log("error");
    // }

    event.target.reset();
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleCancel = () => {
    router.push("/");
  };

  const [count, setCount] = useState(120);

  const recalculateCharacters = (event) => {
    const Characters = document.getElementById("shortDescritpion");
    if (Characters < 121) {
      setCount(120 - event.target.value.length);
    }
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
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie *</FormLabel>
        <FormSelect name="category" id="category" required aria-required="true">
          <option value="Aktivismus">Aktivismus</option>
          <option value="Kunst & Kultur">Kunst & Kultur</option>
          <option value="Bildung & Wissen">Bildung & Wissen</option>
          <option value="Sport & Fitness">Sport & Fitness</option>
        </FormSelect>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="startDate">Beginn *</FormLabel>
        <FormTimeDateWrapper>
          <FormInput
            required
            type="date"
            aria-required="true"
            id="startDate"
            name="startDate"
            placeholder="TT/MM/JJ"
            onClick={(e) => e.currentTarget.showPicker()}
          />
          <FormInputTime
            required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
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
            noValidate
            onClick={(e) => e.currentTarget.showPicker()}
          />
          <FormInputTime type="time" id="endTime" name="endTime" noValidate />
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
            <FormInput type="text" name="street" id="street" />
          </FullWidth>
          <FixedSize>
            <FormLabel htmlFor="houseNumber">Hnr</FormLabel>
            <FormInput type="text" name="houseNumber" id="houseNumber" />
          </FixedSize>
        </FlexContainer>
        <FlexContainer>
          <FixedSize>
            <FormLabel htmlFor="zip">PLZ</FormLabel>
            <FormInput type="text" name="zip" id="zip" $addmarginbottom />
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
          <SwitchButton
            aria-label="Kostenloses Event"
            isChecked={!isChecked}
            toggleCosts={handleToggle}
          />
        </FormCheckboxWrapper>
        <FormLabel htmlFor="cost">Kosten *</FormLabel>
        <FormInput
          id="cost"
          name="cost"
          required
          aria-required="true"
          disabled={isChecked}
          placeholder={isChecked ? "Kostenlos" : ""}
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
        />
      </FormSection>

      <FormSection $positionrelative $smallermargin>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung *</FormLabel>
        <FormDesicriptionField
          $smallerminheight
          maxlength="120"
          id="shortDescription"
          name="shortDescription"
          required
          aria-required="true"
          onChange={recalculateCharacters}
        />
        <CharacterCounter>
          <span id="characterCounter">{count} </span>Zeichen
        </CharacterCounter>
        <SubtitleRight>Erscheint in der Event Vorschau</SubtitleRight>
      </FormSection>

      <FormSection $smallermargin>
        <FormLabel htmlFor="longDescription">Beschreibung *</FormLabel>
        <FormDesicriptionField
          id="longDescription"
          name="longDescription"
          required
          aria-required="true"
        />
        <SubtitleRight>Erscheint auf der Event Seite</SubtitleRight>
      </FormSection>

      <FormSection>
        <FormLabel htmlFor="linkURL">Link für weitere Infos</FormLabel>
        <FormInput
          pattern="http://.*"
          type="url"
          id="linkURL"
          name="linkURL"
          aria-required="true"
          placeholder="http://"
          $addmarginbottom
        />
        <FormLabel htmlFor="linkDescription">Link Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="linkDescription"
          name="linkDescription"
          aria-required="true"
          placeholder="Link Beschreibung"
        />
      </FormSection>

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
