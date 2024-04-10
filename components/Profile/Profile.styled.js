import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";
import Image from "next/image";
import { EditButton } from "../EditEventButton/EditEventButton.styled";
import {
  FormInput,
  FormLabel,
  EventFormStyled,
  FormSection,
} from "../EventForm/EventForm.styled";

export const StyledProfile = styled(Card)`
  position: relative;
  margin: 3rem 0 0 0;
  padding: 6rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled.h1`
  font: var(--font_heading-1);
  color: var(--color_midnight);
  margin: 1.5rem 0;
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

export const ProfileFormSection = styled(FormSection)``;

export const ProfilInputField = styled(FormInput)``;

export const ProfileFormLabel = styled(FormLabel)``;
