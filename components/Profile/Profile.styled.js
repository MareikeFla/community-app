import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";
import Image from "next/image";
import { EditButton } from "../EditEventButton/EditEventButton.styled";
import { EventFormStyled, FormInfoText } from "../EventForm/EventForm.styled";
import { EventName } from "../EventDetail/EventDetail.styled";

export const StyledProfile = styled(Card)`
  position: relative;
  margin-top: 2rem;
  padding: 6rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled(EventName)`
  margin: 1.125rem 0 0 0;
`;

export const PictureProfile = styled(Image)`
  position: absolute;
  top: -2rem;
  object-fit: cover;
  border-radius: 10rem;
  border: 4px solid var(--color_orange);
`;

export const EditProfileButton = styled(EditButton)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const ProfileFormStyled = styled(EventFormStyled)`
  width: 100%;
`;

export const ProfileFormInfoText = styled(FormInfoText)`
  margin-bottom: 1.875rem;
`;
