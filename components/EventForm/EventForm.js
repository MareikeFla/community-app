import {
  EventFormStyled,
  FormSection,
  FormLabel,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormCheckboxWrapper,
  FormDesicriptionField,
} from "./EventForm.styled";
import { Subtitle } from "./EventForm.styled";

export default function EventForm() {
  const handleChange = () => {};

  const handleSubmit = () => {};
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
        <FormInput
          required
          aria-required="true"
          id="startDate"
          name="startDate"
          value=""
          onChange={handleChange}
          placeholder="TT/MM/JJ"
        />
        <FormLabel htmlFor="startTime"></FormLabel>
        <FormInput
          required
          aria-required="true"
          id="startTime"
          name="startTime"
          value=""
          onChange={handleChange}
          placeholder="HH:MM"
        />
      </FormSection>
      <FormSection>
        <div>
          <FormLabel htmlFor="endDate">Ende</FormLabel>
          <FormInput
            id="endDate"
            name="endDate"
            value=""
            onChange={handleChange}
            placeholder="TT/MM/JJ"
          />
        </div>
        <FormLabel htmlFor="endTime"></FormLabel>
        <FormInput
          id="endTime"
          name="endTime"
          value=""
          onChange={handleChange}
          placeholder="HH:MM"
        />
      </FormSection>
      <FormSection aria-describedby="Ort des Events">
        <legend>Ort des Events</legend>
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
          <FormCheckbox
            type="checkbox"
            id="forFree"
            name="forFree"
            value="false"
            onChange={handleChange}
          />
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
        <FormLabel htmlFor="linkURL">Links</FormLabel>
        <FormInput
          type="url"
          id="linkURL"
          name="linkURL"
          onChange={handleChange}
          required
          aria-required="true"
        />
      </FormSection>

      <div>
        <FormLabel htmlFor="imageURL">Bild</FormLabel>
        <FormInput
          type="url"
          id="imageURL"
          name="imageURL"
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      <div>
        <button type="reset">Abbrechen</button>
        <button type="submit">Absenden</button>
      </div>
    </EventFormStyled>
  );
}
