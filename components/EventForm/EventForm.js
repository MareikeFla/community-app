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
import { useData } from "@/lib/useData";

// EventForm component definition. It receives an updateDatabase function for database operations,
// and an optional 'editEvent' object for prefilling form fields during event edits.

export default function EventForm({ updateDatabase, event: editEvent }) {
  const router = useRouter();

  const { data: categories, isLoading, error } = useData().categories;

  if (isLoading) {
    return;
  }
  if (error) {
    return;
  }

  // Handles the form submission, packages form data into an object, and updates the database.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Compiles form data into a structured event object from the form's input fields.
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
    const newEventID = await updateDatabase(eventData); // Calls the updateDatabase function to save the event and retrieves the new or updated event's ID.

    event.target.reset();
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}` // Show event details page after saving
    );
  };

  // Initialize 'free of charge' status based on editEvent's costs or defaults to false.
  // State 'isFreeOfCharge' controls the switch button and the enabling/disabling of the costs input field. Toggled by the switch button.
  const initialFreeOfCharge = editEvent
    ? editEvent.costs === "Kostenlos"
    : true;
  const [isFreeOfCharge, setIsFreeOfCharge] = useState(initialFreeOfCharge);

  // Initializes 'costs' state with editEvent's costs or sets it to empty if creating a new event.
  // State 'costs' is the costs input field value. The input field has an onChange event listener wich calls setCosts to make value editable.
  const initialCosts = editEvent ? editEvent.costs : "";
  const [costs, setCosts] = useState(initialCosts);

  // Updates the 'costs' state based on the 'isFreeOfCharge' toggle.
  // Sets costs to 'Kostenlos' if free, retains existing costs if applicable, or clears if chargeable.
  useEffect(() => {
    if (isFreeOfCharge) {
      setCosts("Kostenlos"); // Show "Kostenlos" in the input field if the event is free of charge
    } else if (editEvent && editEvent.costs !== "Kostenlos") {
      setCosts(editEvent.costs); // Show the events costs value, if not "Kostenlos", if the event is not free of charge and user is editing an event
    } else {
      setCosts(""); // Costs will be empty if the event is not free of charge and user is creating a new event or editing an event with "Kostenlos" in costs value
    }
  }, [isFreeOfCharge, editEvent]);

  // Toggles the 'isFreeOfCharge' state to reflect the event's charge status.
  const handleToggle = () => {
    setIsFreeOfCharge(!isFreeOfCharge);
  };

  // Redirects the user to the main page upon form cancellation.
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
          defaultValue={
            editEvent && editEvent.category ? editEvent.category._id : ""
          }
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
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
