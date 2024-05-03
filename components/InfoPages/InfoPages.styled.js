import styled from "styled-components";

export const Card = styled.div`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
  padding: 1.75rem 1.5rem 0.75rem;
`;

export const Title = styled.h1`
  font: var(--font_heading-1);
  color: var(--color_night);
  margin-bottom: 1.25rem;
`;

export const SubTitle = styled.h2`
  font: var(--font_label);
  color: var(--color_night);
  margin-bottom: 0.125rem;
`;

export const SectionTitle = styled.h3`
  font: var(--font_label);
  font-size: 1rem;
  color: var(--color_night);
  margin: 0.5rem 0 0.375rem;
`;

export const Paragraph = styled.p`
  padding-bottom: 1rem;

  a {
    color: var(--color_red);
    text-decoration: none;
    margin-bottom: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Mail = styled.a`
  color: var(--color_red);
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
