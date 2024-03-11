import Link from "next/link";
import styled from "styled-components";

export const EventListWrapper = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const EventDetailsLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const EventListHeader = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
`;
