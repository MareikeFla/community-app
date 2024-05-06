import { EditProfileButton, Wrapper } from "./Profile.styled";
import { StyledEditIcon } from "../EditEventButton/EditEventButton.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";
import { InfoTitle, Info } from "../EventDetail/EventDetail.styled";
import { Fragment } from "react";

export default function Profile({ toggleEditMode, userInfo }) {
  const { profilePicture, name, additionalInfo } = userInfo;

  return (
    <StyledProfile>
      <EditProfileButton title="Profil bearbeiten" onClick={toggleEditMode}>
        <StyledEditIcon
          src="/assets/icons/icon_edit.svg"
          alt="Bearbeiten Schaltfläche"
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
      <Wrapper>
        {additionalInfo.map((info) => {
          return (
            <Fragment key={info.key}>
              <InfoTitle>{info.text}</InfoTitle>
              <Info>{info.value}</Info>
            </Fragment>
          );
        })}
      </Wrapper>
    </StyledProfile>
  );
}
