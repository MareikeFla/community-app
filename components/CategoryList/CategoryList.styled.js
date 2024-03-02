import styled from "styled-components";
import Link from "next/link";

export const CategoryListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const CategoryListHeader = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
`;

export const CategoryListStyled = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
