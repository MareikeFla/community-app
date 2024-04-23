import { EditProfileButton } from "./Profile.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";
import {
  InfoWrapper,
  InfoTitle,
  Info,
} from "../EventDetail/EventDetail.styled";
import { Fragment } from "react";
import { useTheme } from "styled-components";
import { Edit } from "../SvgIcons/SVGIcons";
import { ProfileSection } from "./Profile.styled";
import { H2 } from "../Fonts/Fonts.styled";
import SwitchButton from "../SwitchButton/SwitchButton";

export default function Profile({ toggleEditMode, userInfo }) {
  const { profilePicture, name, additionalInfo } = userInfo;
  const { theme, toggleColorTheme } = useTheme();
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
        <InfoWrapper>
          {additionalInfo.map((info) => {
            return (
              <Fragment key={info.key}>
                <InfoTitle>{info.text}</InfoTitle>
                <Info>{info.value}</Info>
              </Fragment>
            );
          })}
        </InfoWrapper>
      </ProfileSection>
      <ProfileSection $direction={"column"}>
        <H2>Einstellungen</H2>

        <SwitchButton
          isChecked={theme === "light"}
          onChange={() => {
            toggleColorTheme(theme);
          }}
        ></SwitchButton>
      </ProfileSection>
    </StyledProfile>
  );
}
