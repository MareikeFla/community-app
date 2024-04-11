import { StyledProfile, PictureProfile } from "./Profile.styled";
import { ProfileFormStyled, ProfileFormInfoText } from "./Profile.styled";
import {
  FormSection,
  FormInput,
  FormLabel,
} from "../EventForm/EventForm.styled";
import { FormButtonWrapper } from "../EventForm/EventForm.styled";
import Button from "../Button/Button";
import { useModal } from "@/lib/useModal";

export default function ProfileForm({
  toggleEditMode,
  userInfo,
  handleSubmit,
}) {
  const { showModal } = useModal();
  const { profilePicture, name, additionalInfo } = userInfo;
  const editableInfo = [name, ...additionalInfo];

  return (
    <StyledProfile>
      <PictureProfile
        src={profilePicture.value}
        alt={profilePicture.text}
        height={128}
        width={128}
      />
      <ProfileFormStyled
        onSubmit={(event) => {
          event.preventDefault();
          showModal({
            message: "Änderungen speichern?",
            textButtonCancel: "Abbrechen",
            textButtonConfirm: "Speichern",
            onConfirm: () => handleSubmit(event),
          });
        }}
      >
        {editableInfo.map((info) => {
          const { key, text, value, isRequired } = info;
          return (
            <FormSection key={key}>
              <FormLabel htmlFor={key}>
                {text} {isRequired && "*"}
              </FormLabel>
              <FormInput
                required={key === "name"}
                type="text"
                name={key}
                id={key}
                defaultValue={value}
              ></FormInput>
            </FormSection>
          );
        })}
        <FormButtonWrapper>
          <Button type="button" text="Abbrechen" onClick={toggleEditMode} />
          <Button color="primary" type="submit" text="Speichern" />
        </FormButtonWrapper>
        <ProfileFormInfoText>* Pflichtfeld</ProfileFormInfoText>
      </ProfileFormStyled>
    </StyledProfile>
  );
}
