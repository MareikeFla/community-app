import {
  EventFormStyled,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckboxWrapper,
  FlexWrapper,
  FormDescriptionField,
  FormButtonWrapper,
  ErrorMessage,
  FormLegend,
  FormInfoText,
  FormTimeDateWrapper,
  FileInput,
  UploadButton,
  UploadPreviewContainer,
  UploadPreview,
  FlexContainer,
  FormInputTime,
  FixedSize,
  FullWidth,
  SubtitleLeft,
  SubtitleRight,
  CharacterCounter,
} from "./EventForm.styled";
import { DeleteButton } from "../DeleteEventButton/DeleteEventButton.styled";
import Image from "next/image";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import { upload } from "@/lib/upload";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useModal } from "@/lib/useModal";
import { useData } from "@/lib/useData";
import { useSession } from "next-auth/react";

// EventForm component definition. It receives an updateDatabase function for database operations,
// and an optional 'editEvent' object for prefilling form fields during event edits.

export default function EventForm({ updateDatabase, event: editEvent }) {
  const router = useRouter();
  const { showModal } = useModal();
  const { data: session } = useSession();
  const userID = session?.user.id;

  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(selectedImage);
  const [imagePreview, setImagePreview] = useState(null);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Compiles form data into a structured event object from the form's input fields.
  function getEventData(event) {
    const eventTarget = event.target;
    return {
      createdBy: userID,

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
      image: null,
      links: [
        {
          url: eventTarget.linkURL.value,
          linkDescription: eventTarget.linkDescription.value,
        },
      ],
    };
  }

  // Handles the form submission, packages form data into an object, and updates the database.
  const handleSubmit = async (event) => {
    let eventData = getEventData(event);
    if (selectedImage) {
      const uploadedImage = await upload(selectedImage);
      eventData.image = uploadedImage;
    }
    const newEventID = await updateDatabase(eventData); // Calls the updateDatabase function to save the event and retrieves the new or updated event's ID.
    event.target.reset();
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}` // Show event details page after saving
    );
    return newEventID ? true : false;
  };

  // Initialize 'free of charge' status based on editEvent's costs or defaults to false.
  // State 'isFreeOfCharge' controls the switch button and the enabling/disabling of the costs input field. Toggled by the switch button.
  const initialFreeOfCharge = editEvent
    ? editEvent.costs === "Kostenlos"
    : true;
  const [isFreeOfCharge, setIsFreeOfCharge] = useState(initialFreeOfCharge);

  // Initializes 'costs' state with editEvent's costs or sets it to empty if creating a new event.
  // State 'costs' is the costs input field value. The input field has an onChange event listener which calls setCosts to make value editable.
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setIsImageSelected(false);
  };

  // Calculate the Characters in shortDescription
  const [count, setCount] = useState(120);

  const recalculateCharacters = (event) => {
    const Characters = event.target.value.length;
    if (Characters < 121) {
      setCount(120 - Characters);
    }
  };
  // Auto grow of longDescription textarea
  const autoGrow = (event) => {
    const textareaContainer = event.target;
    textareaContainer.style.height = "auto";
    textareaContainer.style.height = textareaContainer.scrollHeight + 1 + "px";
  };

  if (isLoadingCategories) {
    return;
  }
  if (errorCategories) {
    return;
  }

  return (
    <EventFormStyled
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitAttempted(true);
        if (
          !selectedImage ||
          (selectedImage && isImageSelected && isConsentChecked)
        ) {
          showModal({
            message: "Event speichern?", // Default message
            textButtonCancel: "Abbrechen", // Default text for the cancel button
            textButtonConfirm: "Speichern", // Default text for the confirm button
            onConfirm: () => handleSubmit(event),
          });
        }
      }}
    >
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
        <FormLabel htmlFor="startDate">Beginn *</FormLabel>
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
            onClick={(e) => e.currentTarget.showPicker()}
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
            noValidate
            onClick={(e) => e.currentTarget.showPicker()}
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={editEvent && editEvent.end ? editEvent.end.time : ""}
            noValidate
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
          <FlexWrapper>
            <label htmlFor="forFree">Kostenlos</label>
            <SwitchButton isChecked={isFreeOfCharge} onChange={handleToggle} />
          </FlexWrapper>
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

      <FormSection $positionrelative $smallermargin>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung *</FormLabel>
        <FormDescriptionField
          $smallerminheight
          maxLength="120"
          id="shortDescription"
          name="shortDescription"
          required
          aria-required="true"
          onChange={recalculateCharacters}
          defaultValue={editEvent ? editEvent.shortDescription : ""}
        />
        <CharacterCounter>
          <span id="characterCounter">{count} </span>Zeichen
        </CharacterCounter>
        <SubtitleRight>Erscheint in der Event Vorschau</SubtitleRight>
      </FormSection>

      <FormSection $smallermargin>
        <FormLabel htmlFor="longDescription">Beschreibung *</FormLabel>
        <FormDescriptionField
          onInput={autoGrow}
          id="longDescription"
          name="longDescription"
          required
          aria-required="true"
          defaultValue={editEvent ? editEvent.longDescription : ""}
        />
        <SubtitleRight>Erscheint auf der Event Seite</SubtitleRight>
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="image">
          Bild <div>(JPG/PNG, Querformat empfohlen)</div>
        </FormLabel>
        <FileInput
          type="file"
          id="image"
          name="image"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
        />
        <UploadButton htmlFor="image">
          {isImageSelected ? (
            <>
              <Image
                src="/assets/icons/icon_replace.svg"
                alt="Bild ersetzen"
                width={22}
                height={22}
              />
              Bild ersetzen
            </>
          ) : (
            <>
              <Image
                src="/assets/icons/icon_image-upload.svg"
                alt="Bild hochladen"
                width={22}
                height={22}
              />
              Bild hochladen
            </>
          )}
        </UploadButton>
        {imagePreview && (
          <UploadPreviewContainer>
            <UploadPreview
              src={imagePreview}
              alt="Bildvorschau"
              fill
              sizes="100vw 100vh"
            />
            <DeleteButton
              $uploadPreview
              title="Bild entfernen"
              onClick={() => handleDeleteImage()}
            >
              <Image
                src="/assets/icons/icon_delete.svg"
                alt="Bild entfernen"
                width={21}
                height={23}
              />
            </DeleteButton>
          </UploadPreviewContainer>
        )}
        {isImageSelected && (
          <FormCheckboxWrapper $consentMargin>
            <FlexWrapper>
              <label htmlFor="imageConsent">
                Einwilligung zur Bildfreigabe *
              </label>
              <SwitchButton
                isChecked={isConsentChecked}
                onChange={() => setIsConsentChecked(!isConsentChecked)}
              />
            </FlexWrapper>
            <p>
              Ich besitze alle erforderlichen Rechte an dem ausgewählten Bild
              und bin mit der Verwendung einverstanden.
            </p>
            {submitAttempted && !isConsentChecked && (
              <ErrorMessage>Bitte bestätigen, um fortzufahren.</ErrorMessage>
            )}
          </FormCheckboxWrapper>
        )}
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="linkURL">Link für weitere Infos</FormLabel>
        <FormInput
          pattern="http://.*"
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
