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
import { useData } from "@/lib/useData";
import { useModal } from "@/lib/useModal";

export default function ProfileForm({ toggleEditMode, session }) {
  const user = session?.user;
  const { updateUser } = useData();
  const { showModal } = useModal();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = await updateUser(event, user);
    if (userData) {
      session.user = userData;
      toggleEditMode();
      return true;
    } else {
      toggleEditMode();
      return false;
    }
  };

  return (
    <StyledProfile>
      <PictureProfile
        src={user?.image}
        alt="profile picture"
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
        <ProfileFormSection>
          <ProfileFormLabel htmlFor="name">Name *</ProfileFormLabel>
          <ProfilInputField
            required
            type="text"
            name="name"
            id="name"
            defaultValue={user?.name}
          ></ProfilInputField>
        </ProfileFormSection>
        <ProfileFormSection>
          <ProfileFormLabel htmlFor="email">E-Mail</ProfileFormLabel>
          <ProfilInputField
            type="text"
            name="email"
            id="email"
            defaultValue={user?.email}
          ></ProfilInputField>
        </ProfileFormSection>
        <FormButtonWrapper>
          <Button type="button" text="Abbrechen" onClick={toggleEditMode} />
          <Button color="primary" type="submit" text="Speichern" />
        </FormButtonWrapper>
        <FormInfoText>* Pflichtfeld</FormInfoText>
      </ProfileFormStyled>
    </StyledProfile>
  );
}
