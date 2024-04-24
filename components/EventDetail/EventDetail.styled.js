import styled, { css } from "styled-components";
import Image from "next/image";

export const Card = styled.div`
  background-color: var(--color_base);
  border-radius: ${({ $withImage }) =>
    $withImage
      ? "0 0 var(--border-radius_card) var(--border-radius_card)"
      : "var(--border-radius_card)"};
  box-shadow: var(--shadow_one);
  padding: ${({ $withImage, pageNotFound, $createdBy, $userId }) =>
    $withImage
      ? "1.5rem 1.5rem 0.75rem"
      : pageNotFound
      ? "3rem 1.5rem 2.75rem"
      : $createdBy !== $userId
      ? "2rem 1.5rem 0.75rem"
      : "3rem 1.5rem 0.75rem"};
`;

export const ErrorMessage = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
  text-align: center;
`;

export const EventHeader = styled.div`
  position: relative;
  height: 14.75rem;
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    height: 19rem;
  }
`;

export const EventImage = styled(Image)`
  border-top-left-radius: var(--border-radius_card);
  border-top-right-radius: var(--border-radius_card);
  object-fit: cover;
`;

export const EventName = styled.h1`
  margin-bottom: 1.125rem;
  font: var(--font_heading-1);
  color: var(--color_night);
  text-align: center;
  ${({ $withImage }) =>
    $withImage &&
    css`
      position: absolute;
      bottom: 1rem;
      font: var(--font_heading-1);
      color: ${(props) =>
        props.theme === "dark"
          ? "var(--color_light-grey)"
          : "var(--color_night)"};
      text-align: center;
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 4px;
      padding: 0.438rem 0.625rem 0.25rem 0.625rem;
      margin-bottom: 0;
      max-width: 90%;
      z-index: 1;
    `}
`;

export const Description = styled.p`
  font: var(--font_body);
  white-space: pre-wrap;
`;

export const ExpandCollapseButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--color_base);
  color: var(--color_orange);
  font: var(--font_body);
`;

export const DescriptionContainer = styled.div`
  overflow: hidden;
  max-height: ${(props) => props.$containerHeight};
  transition: max-height 0.9s ease-in-out;
`;

export const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(6.25rem, 1fr) 2fr;
  gap: 0.5rem;
  margin: 1.25rem 0 1.875rem;
  padding: 1.125rem 1rem 1rem;
  border: 1px solid var(--color_light-grey);
  border-radius: var(--border-radius_card);
`;

export const InfoTitle = styled.span`
  font: var(--font_label);
  color: var(--color_night);
`;

export const Info = styled.p`
  font: var(--font_info);
  color: var(--color_grey);
`;

export const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  position: relative;
`;

export const ListItemLink = styled.a`
  display: inline-block;
  margin-left: 0.75rem;
  vertical-align: top;
  font: var(--font_info);
  color: var(--color_red);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ListItemMarker = styled.span`
  position: absolute;
  bottom: 0.188rem;
  color: var(--color_red);
`;

export const ButtonWrapper = styled.section`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.438rem;
`;

export const AttendeeWrapper = styled.section`
  text-align: right;
  border-top: 1px solid var(--color_light-grey);
  margin-top: 1.375rem;
  margin-inline: -1.5rem;
  padding-top: 0.75rem;
  padding-inline: 1.5rem;
  font: var(--font_label);
  color: var(--color_night);
`;
