import Image from "next/image";
import styled from "styled-components";

export const CategoryHeaderContainer = styled.div`
  position: relative;
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    height: 16.25rem;
  }
`;

export const CategoryTitle = styled.h1`
  font: var(--font_heading-category);
  color: var(--color_five);
  text-transform: uppercase;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  padding: 0.438rem 0.625rem 0.25rem 0.625rem;
  text-align: center;
  max-width: 90%;
  z-index: 1;
`;

export const CategoryImage = styled(Image)`
  border-radius: var(--border-radius_card);
  object-fit: cover;
`;
