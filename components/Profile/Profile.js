import { EditProfileButton } from "./Profile.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";
import { InfoTitle, Info } from "../EventDetail/EventDetail.styled";
import { Fragment } from "react";
import { useTheme } from "styled-components";
import { Edit } from "../SvgIcons/SVGIcons";
import { ProfileSection } from "./Profile.styled";

import { ProfileInfo } from "./Profile.styled";

export default function Profile({ toggleEditMode, userInfo }) {
  const { profilePicture, name, additionalInfo } = userInfo;
  const { theme } = useTheme();
  return (
    <StyledProfile>
      <EditProfileButton title="Profil bearbeiten" onClick={toggleEditMode}>
        <Edit $theme={theme}></Edit>
      </EditProfileButton>
      <PictureProfile
        src={profilePicture.value}
        alt={profilePicture.text}
        height={profilePicture.pictureSize}
        width={profilePicture.pictureSize}
      />
      <ProfileSection $direction={"column"} $align={"center"}>
        <UserName>{name.value}</UserName>
        <ProfileInfo>
          {additionalInfo.map((info) => {
            return (
              <Fragment key={info.key}>
                <InfoTitle>{info.text}</InfoTitle>
                <Info>{info.value}</Info>
              </Fragment>
            );
          })}
        </ProfileInfo>
      </ProfileSection>
    </StyledProfile>
  );
}
