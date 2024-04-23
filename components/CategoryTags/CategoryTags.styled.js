import styled from "styled-components";

export const CategoryTagList = styled.div`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.438rem;
`;

export const CategoryTag = styled.span`
  font: var(--font_tag);
  color: var(--color_base);
  text-transform: uppercase;
  background-color: ${({ color }) => `var(--color_${color})`};
  border: none;
  border-radius: var(--border-radius_button);
  padding: 0.375rem 0.625rem 0.3125rem;
`;
