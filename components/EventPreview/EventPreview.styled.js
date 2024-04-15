import styled from "styled-components";
import Image from "next/image";

export const Card = styled.div`
  background-color: var(--color_white);
  border-radius: ${({ $withImage }) =>
    $withImage
      ? "0 0 var(--border-radius_card) var(--border-radius_card)"
      : "var(--border-radius_card)"};
  box-shadow: var(--shadow_card);
  padding: 1.25rem 1.5rem 0.313rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 14.75rem;
  display: flex;
  justify-content: center;
`;

export const EventImage = styled(Image)`
  border-top-left-radius: var(--border-radius_card);
  border-top-right-radius: var(--border-radius_card);
  object-fit: cover;
  box-shadow: 0px -2px 12px 0px rgba(91, 95, 98, 0.2);
`;

export const PreviewTitle = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
  margin-bottom: 0.375rem;
`;

export const PreviewDescription = styled.p`
  font: var(--font_body);
  margin-bottom: 0.875rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.438rem;
  gap: 0.188rem 0.75rem;
`;

export const Icon = styled.img`
  margin-right: 0.188rem;
`;

export const Info = styled.p`
  font: var(--font_info);
  color: var(--color_grey);
`;

export const Divider = styled.div`
  height: 0.063rem;
  background-color: var(--color_light-grey);
  width: calc(100% + 3rem);
  margin: 1.25rem -1.5rem 0;
`;
