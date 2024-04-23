import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";
import Image from "next/image";
import { EditButton } from "../EditEventButton/EditEventButton.styled";
import { EventFormStyled, FormInfoText } from "../EventForm/EventForm.styled";
import { EventName } from "../EventDetail/EventDetail.styled";
import { InfoWrapper } from "../EventDetail/EventDetail.styled";

export const StyledProfile = styled(Card)`
  position: relative;
  margin-top: 2rem;
  padding: 6rem 0 0 0;
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
  border: 4px solid var(--color_eight);
`;

export const EditProfileButton = styled(EditButton)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const ProfileFormStyled = styled(EventFormStyled)`
  width: 100%;
  padding: 0 1rem;
`;

export const ProfileFormInfoText = styled(FormInfoText)`
  margin-bottom: 1.875rem;
`;

export const ProfileSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "row"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
  align-items: ${({ $align }) => $align || "stretch"};
  padding: 0 1rem;

  &#settings {
    background-color: var(--color_base);
    border-radius: var(--border-radius_card);
    box-shadow: var(--shadow_one);
  }
`;

// SWITCH

export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
`;

export const SwitchInput = styled.input`
  display: none;
`;

export const SwitchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color_gradientOne);
  border-radius: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background-color: var(--color_base);
  border-radius: 50%;
  left: ${({ $checked }) => ($checked ? "calc(100% - 22px)" : "2px")};
  transition: left var(--transition_button) ease;
  &:hover {
    cursor: pointer;
  }
`;

export const ProfileInfo = styled(InfoWrapper)`
  margin: 1.5rem 0;
`;
