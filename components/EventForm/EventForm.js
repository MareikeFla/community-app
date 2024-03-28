// Functionall imports

import { useData } from "@/lib/useData";
import { useEventForm } from "@/lib/useEventForm";

// Styling imports

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
  FormTimeDateWrapper,
  FlexContainer,
  FormInputTime,
  FixedSize,
  FullWidth,
  SubtitleLeft,
  SubtitleRight,
  CharacterCounter,
  InvalidFieldMessage,
} from "./EventForm.styled";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import AutoResizingTextArea from "./AutoResizingTextArea";

// EventForm component definition. It receives an updateDatabase function for database operations,
// and an optional 'editEvent' object for prefilling form fields during event edits.
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";
import { getFormattedTodaysDate } from "@/lib/dateHelpers";

export default function EventForm({ onSubmit, event: editEvent }) {
  // Using custom hook to fetch categories data
  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  // Custom hook to manage form state and logic
  const {
    eventFormStates,
    updateEventFormStates,
    eventFormErrors,
    handleCancel,
    MAX_CHAR_COUNT,
    validateFormAndSubmit,
  } = useEventForm(editEvent);

  const {
    costs,
    isFreeOfCharge,
    startDate,
    endDate,
    startTime,
    endTime,
    charactersLeft,
    isStreetRequired,
    isLinkRequired,
  } = eventFormStates;

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
        const data = new FormData(event.target);
        const formData = Object.fromEntries(data);
        validateFormAndSubmit(formData, onSubmit);
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
          defaultValue={editEvent?.eventName || ""}
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
            min={
              editEvent?.creationDate
                ? editEvent.creationDate
                : getFormattedTodaysDate()
            }
            value={startDate}
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={(event) =>
              updateEventFormStates({
                type: "changeStartDate",
                value: event.target.value,
              })
            }
          />
          <FormInputTime
            required
            type="time"
            aria-required="true"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={(event) =>
              updateEventFormStates({
                type: "changeStartTime",
                value: event.target.value,
              })
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
            value={endDate}
            noValidate
            onClick={(event) => event.currentTarget.showPicker()}
            onChange={(event) =>
              updateEventFormStates({
                type: "changeEndDate",
                value: event.target.value,
              })
            }
          />
          <FormInputTime
            type="time"
            id="endTime"
            name="endTime"
            value={endTime}
            noValidate
            onChange={(event) =>
              updateEventFormStates({
                type: "changeEndTime",
                value: event.target.value,
              })
            }
          />
        </FormTimeDateWrapper>
        {eventFormErrors?.endDate && (
          <InvalidFieldMessage>{eventFormErrors.endDate}</InvalidFieldMessage>
        )}
        {eventFormErrors?.endTime && (
          <InvalidFieldMessage>{eventFormErrors.endTime}</InvalidFieldMessage>
        )}
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
              required={isStreetRequired}
              defaultValue={editEvent?.location?.street || ""}
            />
          </FullWidth>
          <FixedSize>
            <FormLabel htmlFor="houseNumber">Hnr</FormLabel>
            <FormInput
              type="text"
              name="houseNumber"
              id="houseNumber"
              defaultValue={editEvent?.location?.houseNumber || ""}
              onChange={(event) =>
                updateEventFormStates({
                  type: "setCorrespondingFieldRequired",
                  value: event.target.value,
                  correspondingField: "street",
                })
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
              defaultValue={editEvent?.location?.zip || ""}
            />
          </FixedSize>
          <FullWidth>
            <FormLabel htmlFor="city">Ort</FormLabel>
            <FormInput
              type="text"
              name="city"
              id="city"
              defaultValue={editEvent?.location?.city || ""}
            />
          </FullWidth>
        </FlexContainer>
      </FormSection>
      <FormSection>
        <FormCheckboxWrapper>
          <FormLabel htmlFor="forFree">Kostenlos</FormLabel>
          <SwitchButton
            isChecked={isFreeOfCharge}
            toggleIsFreeOfCharge={() =>
              updateEventFormStates({
                type: "handleFreeOfChargeAndCostsRelation",
              })
            }
          />
        </FormCheckboxWrapper>
        <FormLabel htmlFor="costs">Kosten *</FormLabel>
        <FormInput
          id="costs"
          name="costs"
          required
          aria-required="true"
          disabled={isFreeOfCharge}
          value={costs}
          onChange={(event) =>
            updateEventFormStates({
              type: "changeCosts",
              value: event.target.value,
            })
          }
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
          onChange={(event) =>
            updateEventFormStates({
              type: "recalculateCharactersLeft",
              value: event.target.value.length,
            })
          }
          defaultValue={editEvent?.shortDescription || ""}
        />
        <CharacterCounter>
          <span id="characterCounter">{charactersLeft} </span>Zeichen
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
          onChange={(event) =>
            updateEventFormStates({
              type: "setCorrespondingFieldRequired",
              value: event.target.value,
              correspondingField: "link",
            })
          }
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
