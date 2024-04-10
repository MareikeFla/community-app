import { EditProfileButton } from "./Profile.styled";
import { StyledEditIcon } from "../EditEventButton/EditEventButton.styled";
import {
  StyledProfile,
  UserName,
  UserDetail,
  PictureProfile,
  pictureSize,
} from "./Profile.styled";

export default function Profile({ toggleEditMode, userInfo }) {
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
      {userInfo.map((info) => {
        if (info.key === "name") {
          return <UserName key={info.key}>{info.value}</UserName>;
        }
        if (info.key === "image") {
          return (
            <PictureProfile
              key={info.key}
              src={info.value}
              alt={info.text}
              height={pictureSize}
              width={pictureSize}
            />
          );
        }
        return (
          <UserDetail key={info.key}>
            {info.text}: {info.value}
          </UserDetail>
        );
      })}
    </StyledProfile>
  );
}
