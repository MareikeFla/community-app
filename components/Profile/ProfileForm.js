import { StyledProfile, PictureProfile } from "./Profile.styled";
import {
  ProfileFormStyled,
  ProfileFormLabel,
  ProfilInputField,
  ProfileFormSection,
} from "./Profile.styled";
import { FormInfoText } from "../EventForm/EventForm.styled";
import { FormButtonWrapper } from "../EventForm/EventForm.styled";
import Button from "../Button/Button";
import { useModal } from "@/lib/useModal";

export default function ProfileForm({
  toggleEditMode,
  userInfo,
  handleSubmit,
}) {
  const { showModal } = useModal();

  const [profilePicture] = userInfo.filter((info) => info.key === "image");
  const filteredUserinfo = userInfo.filter((info) => info.key !== "image");

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
        {filteredUserinfo.map((info) => {
          const { key, text, value, isRequired } = info;
          return (
            <ProfileFormSection key={key}>
              <ProfileFormLabel htmlFor={key}>
                {text} {isRequired && "*"}
              </ProfileFormLabel>
              <ProfilInputField
                required={key === "name"}
                type="text"
                name={key}
                id={key}
                defaultValue={value}
              ></ProfilInputField>
            </ProfileFormSection>
          );
        })}
        <FormButtonWrapper>
          <Button type="button" text="Abbrechen" onClick={toggleEditMode} />
          <Button color="primary" type="submit" text="Speichern" />
        </FormButtonWrapper>
        <FormInfoText>* Pflichtfeld</FormInfoText>
      </ProfileFormStyled>
    </StyledProfile>
  );
}
