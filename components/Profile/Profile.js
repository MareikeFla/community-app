import { EditProfileButton } from "./Profile.styled";
import { StyledEditIcon } from "../EditEventButton/EditEventButton.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";
import {
  InfoWrapper,
  InfoTitle,
  Info,
} from "../EventDetail/EventDetail.styled";

export default function Profile({ toggleEditMode, userInfo }) {
  const { profilePicture, name, additionalInfo } = userInfo;

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
      <UserName>{name.value}</UserName>
      <PictureProfile
        src={profilePicture.value}
        alt={profilePicture.text}
        height={profilePicture.pictureSize}
        width={profilePicture.pictureSize}
      />
      <InfoWrapper>
        {additionalInfo.map((info) => {
          return (
            <>
              <InfoTitle key={info.key}>{info.text}:</InfoTitle>
              <Info>{info.value}</Info>
            </>
          );
        })}
      </InfoWrapper>
    </StyledProfile>
  );
}
