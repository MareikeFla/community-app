import styled from "styled-components";
import Link from "next/link";

export const CategoryListContainer = styled.section`
  display: flex;
  flex-direction: column;
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
