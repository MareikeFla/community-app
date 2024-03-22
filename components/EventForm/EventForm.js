// Functionall imports

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useData } from "@/lib/useData";
import {
  autoGrow,
  useEventForm,
  getFormattedTodayDate,
} from "@/lib/useEventForm";

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
} from "./EventForm.styled";
import Button from "../Button/Button";
import SwitchButton from "../SwitchButton/SwitchButton";
import { useModal } from "@/lib/useModal";
import { useSession } from "next-auth/react";

// EventForm component definition. It receives an updateDatabase function for database operations,
// and an optional 'editEvent' object for prefilling form fields during event edits.
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";

export default function EventForm({ updateDatabase, event: editEvent }) {
  const router = useRouter();
  const { showModal } = useModal();
  const { data: session } = useSession();
  const userID = session?.user.id;

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
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    handleCancel,
    handleCostsChange,
    MAX_CHAR_COUNT,
  } = useEventForm(editEvent);

  // Effect to update costs state based on the isFreeOfCharge flag or editEvent data
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
    <EventFormStyled onSubmit={(event) => handleSubmit(event, updateDatabase)}>
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
            min={editEvent ? startDate : getFormattedTodayDate()}
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
        <FlexContainer $addmarginbottom>
          <FullWidth>
            <FormLabel htmlFor="street">Straße</FormLabel>
            <FormInput
              type="text"
              name="street"
              id="street"
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
            toggleIsFreeOfCharge={() => setIsFreeOfCharge(!isFreeOfCharge)}
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
          $smallerminheight
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
        <FormDescriptionField
          onInput={autoGrow}
          id="longDescription"
          name="longDescription"
          required
          aria-required="true"
          defaultValue={editEvent?.longDescription || ""}
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
          $addmarginbottom
          placeholder="http://"
          defaultValue={editEvent?.links[0]?.url || ""}
        />
        <FormLabel htmlFor="linkDescription">Link Beschreibung</FormLabel>
        <FormInput
          type="text"
          id="linkDescription"
          name="linkDescription"
          placeholder="Link Beschreibung"
          defaultValue={editEvent?.links[0]?.linkDescription || ""}
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
