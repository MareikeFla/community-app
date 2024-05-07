import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export const Card = styled.div`
  display: grid;
  align-items: center;
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);

  @media (min-width: 375px) {
    grid-template-columns: ${(props) =>
      props.$loggedIn ? "1fr" : "1fr minmax(8.875rem, 15%)"};
  }
`;

export const Content = styled.div`
  padding: 1.75rem 1.5rem 2rem;

  @media (min-width: 375px) {
    padding-right: 0.5rem;
  }
`;

export const Heading = styled.h1`
  font: var(--font_heading-1);
  color: var(--color_night);
  margin-bottom: ${(props) => (props.$loggedIn ? ".313rem" : "1rem")};
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const Paragraph = styled.p`
  font: var(--font_body);
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 1.125rem;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font: var(--font_button);
  color: var(--color_white);
  text-transform: uppercase;
  text-decoration: none;
  background-color: var(--color_orange);
  border-radius: var(--border-radius_button);
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  transition: var(--transition_button);

  &:hover {
    background-color: var(--color_light-orange);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.625rem;
  aspect-ratio: 1;
  background-color: var(--color_light-orange);
  border-radius: var(--border-radius_round-button);
`;

export const Illustration = styled(Image)`
  display: none;
  justify-self: end;
  margin: 1.25rem 0;
  width: 100%;
  height: auto;

  @media (min-width: 375px) {
    display: block;
  }
`;
