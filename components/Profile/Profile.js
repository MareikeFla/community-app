import { EditProfileButton } from "./Profile.styled";
import { StyledEditIcon } from "../EditEventButton/EditEventButton.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";

export default function Profile({ toggleEditMode, session }) {
  const user = session?.user;
  return (
    <StyledProfile>
      <EditProfileButton title="Profil bearbeiten" onClick={toggleEditMode}>
        <StyledEditIcon
          src="/assets/icons/icon_edit.svg"
          alt="Edit button"
          width={22}
          height={22}
        />
      </EditProfileButton>
      <PictureProfile
        src={user?.image}
        alt="Profile picture"
        height={128}
        width={128}
      />
      <UserName>{user?.name}</UserName>
      <p>{user?.email}</p>
    </StyledProfile>
  );
}
