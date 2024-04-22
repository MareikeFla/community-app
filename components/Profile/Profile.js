import { EditProfileButton } from "./Profile.styled";
import { StyledProfile, UserName, PictureProfile } from "./Profile.styled";
import {
  InfoWrapper,
  InfoTitle,
  Info,
} from "../EventDetail/EventDetail.styled";
import { Fragment } from "react";
import { useColorTheme } from "@/lib/useColorTheme";
import { Edit } from "../SvgIcons/SVGIcons";

export default function Profile({ toggleEditMode, userInfo }) {
  const { profilePicture, name, additionalInfo } = userInfo;
  const { theme } = useColorTheme();
  return (
    <StyledProfile>
      <EditProfileButton title="Profil bearbeiten" onClick={toggleEditMode}>
        <Edit $theme={theme}></Edit>
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
            <Fragment key={info.key}>
              <InfoTitle>{info.text}</InfoTitle>
              <Info>{info.value}</Info>
            </Fragment>
          );
        })}
      </InfoWrapper>
    </StyledProfile>
  );
}
