// Functionall imports

import { useEffect, useState } from "react";
import { useData } from "@/lib/useData";
import { useEventForm } from "@/lib/useEventForm";
import useDebounce from "@/lib/useDebouce";
import { useModal } from "@/lib/useModal";
import { getFormattedTodaysDate } from "@/lib/dateHelpers";
// Styling imports

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
  LocationList,
  LocationButton,
  SearchedText,
} from "./EventForm.styled";
import { DeleteButton } from "../DeleteEventButton/DeleteEventButton.styled";
import Image from "next/image";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import AutoResizingTextArea from "./AutoResizingTextArea";
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";
import dynamic from "next/dynamic";
import EditButton from "../EditButton/EditButton";
import usePlaceSearch from "@/lib/usePlaceSearch";
const Map = dynamic(() => import("../Map/Map"), { ssr: false });

// EventForm component definition. It receives an updateDatabase function for database operations,
// and an optional 'editEvent' object for prefilling form fields during event edits.

export default function EventForm({ onSubmit, event: editEvent }) {
  const { showModal } = useModal();
  const { placeList, setPlaceList, getPlaces } = usePlaceSearch();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [searchedText, setSearchedText] = useState(
    editEvent ? turnAddressToEditIntoString(editEvent) : ""
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [eventLocation, setEventLocation] = useState({});
  const [eventName, setEventName] = useState(editEvent?.eventName || "");

  // Using custom hook to fetch categories data
  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  // Custom hook to manage form state and logic
  const {
    isFreeOfCharge,
    setIsFreeOfCharge,
    costs,
    setCosts,
    count,
    recalculateCharacters,
    startDate,
    endDate,
    selectedImage,
    isImageSelected,
    imagePreview,
    isConsentChecked,
    setIsConsentChecked,
    submitAttempted,
    setSubmitAttempted,
    handleStartDateChange,
    handleEndDateChange,
    handleCostsChange,
    handleImageChange,
    handleDeleteImage,
    handleSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
    isStreetRequired,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
  } = useEventForm(editEvent);

  useEffect(() => {
    if (debouncedSearchText) {
      getPlaces(debouncedSearchText);
    }
  }, [debouncedSearchText]);

  function turnAddressIntoEventLocation(item) {
    setSelectedAddress(item);
    const eventMapObject = {
      eventName: eventName,
      location: {
        street: item?.address.road || "",
        houseNumber: item?.address.house_number || "",
        zip: item?.address.postcode || "",
        city:
          item?.address.village ||
          item?.address.town ||
          item?.address.city ||
          "",
        latitude: item?.lat,
        longitude: item?.lon,
      },
    };

    setEventLocation(eventMapObject);
  }

  function turnSearchTextIntoString(item) {
    const addressParts = [
      item?.address.road || "",
      item?.address.house_number || "",
      item?.address.house_number && item?.address.postcode
        ? `, ${item.address.postcode}`
        : item?.address.postcode || "",
      item?.address.village ||
        item?.address.town ||
        item?.address.city ||
        item?.address.city_district ||
        "",
    ].filter(Boolean);

    return addressParts.join(" ").trim();
  }

  function turnAddressToEditIntoString(item) {
    const addressParts = [
      item?.location?.street || "",
      item?.location?.houseNumber || "",
      item?.location?.houseNumber && item?.location?.zip
        ? `, ${item?.location?.zip}`
        : item?.location?.zip || "",
      item?.location?.city || "",
    ].filter(Boolean);

    return addressParts.join(" ").trim();
  }

  // Updates the 'costs' state based on the 'isFreeOfCharge' toggle.
  // Sets costs to 'Kostenlos' if free, retains existing costs if applicable, or clears if chargeable.
  useEffect(() => {
    if (isFreeOfCharge) {
      setCosts("Kostenlos");
    } else if (editEvent && editEvent.costs !== "Kostenlos") {
      setCosts(editEvent.costs);
    } else {
      setCosts("");
    }
  }, [isFreeOfCharge, editEvent]);

  if (isLoadingCategories) {
    return <Loading />;
  }
  if (errorCategories) {
    return <FetchingError />;
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
            onConfirm: () =>
              handleSubmit(
                event,
                onSubmit,
                selectedImage,
                editEvent,
                eventLocation
              ),
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
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />
      </FormSection>
      <FormSection>
        <FormLabel htmlFor="category">Kategorie *</FormLabel>
        <FormSelect
          name="category"
          id="category"
          required
          aria-required="true"
          defaultValue={editEvent?.category?._id || ""}
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
            min={editEvent ? startDate : getFormattedTodaysDate()}
            value={startDate}
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={(event) => handleStartDateChange(event)}
          />
          <FormInputTime
            required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
            defaultValue={editEvent?.start?.time || ""}
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
            min={startDate}
            value={endDate}
            noValidate
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={(event) => handleEndDateChange(event)}
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={editEvent?.end?.time || ""}
            noValidate
          />
        </FormTimeDateWrapper>
      </FormSection>
      <FormSection aria-describedby="Ort des Events">
        <FormLegend>
          Ort des Events
          <SubtitleLeft>(Für Online Events bitte leer lassen)</SubtitleLeft>
        </FormLegend>
        <FlexContainer>
          <FullWidth>
            <FormLabel htmlFor="address">Adresse</FormLabel>
            {searchedText ? (
              <FlexContainer>
                <SearchedText>{searchedText}</SearchedText>
                <EditButton
                  onEdit={() => {
                    setSearchText(searchedText);
                    setSearchedText(false);
                  }}
                >
                  edit
                </EditButton>
              </FlexContainer>
            ) : (
              <FlexContainer>
                <FormInput
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={searchText}
                  onInput={(event) => setSearchText(event.target.value)}
                />
              </FlexContainer>
            )}
            <LocationList>
              {placeList.length > 0 &&
                placeList.map((item) => (
                  <li key={item?.osm_id}>
                    <LocationButton
                      type="button"
                      onClick={() => {
                        setSearchedText(turnSearchTextIntoString(item));
                        setPlaceList([]);
                        turnAddressIntoEventLocation(item);
                      }}
                    >
                      {turnSearchTextIntoString(item)}
                    </LocationButton>
                  </li>
                ))}
            </LocationList>
          </FullWidth>
        </FlexContainer>
        {selectedAddress && <Map event={eventLocation} />}
      </FormSection>
      <FormSection>
        <FormCheckboxWrapper>
          <FlexWrapper>
            <label htmlFor="forFree">Kostenlos</label>
            <SwitchButton
              isChecked={isFreeOfCharge}
              onChange={() => setIsFreeOfCharge(!isFreeOfCharge)}
            />
          </FlexWrapper>
        </FormCheckboxWrapper>
        <FormLabel htmlFor="costs">Kosten *</FormLabel>
        <FormInput
          id="costs"
          name="costs"
          required
          aria-required="true"
          disabled={isFreeOfCharge}
          value={costs}
          onChange={(event) => handleCostsChange(event)}
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
          defaultValue={editEvent?.organization?.organizationName || ""}
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
          defaultValue={editEvent?.organization?.organizationContact || ""}
        />
      </FormSection>
      <FormSection $positionrelative $smallermargin>
        <FormLabel htmlFor="shortDescription">Kurzbeschreibung *</FormLabel>
        <FormDescriptionField
          maxLength={MAX_CHAR_COUNT}
          id="shortDescription"
          name="shortDescription"
          required
          aria-required="true"
          onChange={recalculateCharacters}
          defaultValue={editEvent?.shortDescription || ""}
        />
        <CharacterCounter>
          <span id="characterCounter">{count} </span>Zeichen
        </CharacterCounter>
        <SubtitleRight>Erscheint in der Event Vorschau</SubtitleRight>
      </FormSection>
      <FormSection $smallermargin>
        <FormLabel htmlFor="longDescription">Beschreibung *</FormLabel>
        <AutoResizingTextArea
          initialLongDescription={editEvent?.longDescription || ""}
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
          pattern="https?://.*"
          type="url"
          id="linkURL"
          name="linkURL"
          required={isLinkRequired}
          defaultValue={editEvent?.links[0]?.url || ""}
          $addmarginbottom
          placeholder="http://"
        />
        <FormLabel htmlFor="linkDescription">Link Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="linkDescription"
          name="linkDescription"
          placeholder="Link Beschreibung"
          defaultValue={editEvent?.links[0]?.linkDescription || ""}
          onChange={(event) => checkIfCorrespondingFieldIsRequired(event)} // Set the link URL required if a link description is entered
        />
      </FormSection>
      <FormButtonWrapper>
        <Button type="button" text="Abbrechen" onClick={handleCancel} />
        <Button color="primary" type="submit" text="Absenden" />
      </FormButtonWrapper>
      <FormInfoText>* Pflichtfeld</FormInfoText>
    </EventFormStyled>
  );
}
