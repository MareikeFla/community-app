import styled from "styled-components";
import Image from "next/image";

export const CategoryCardContainer = styled.div`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 67%;
`;

export const CategoryImage = styled(Image)`
  position: relative;
  width: 100%;
  height: auto;
  border-top-left-radius: var(--border-radius_card);
  border-top-right-radius: var(--border-radius_card);
  object-fit: cover;
`;

export const CategoryInfoContainer = styled.section`
  padding: 0.75rem 0.75rem 0.688rem;
`;

export const CategoryInfoHeading = styled.h3`
  font: var(--font_heading-3);
  color: var(--color_night);
  text-transform: uppercase;
  padding-bottom: 0.125rem;
`;

export const CategoryInfo = styled.p`
  font: var(--font_info);
`;
