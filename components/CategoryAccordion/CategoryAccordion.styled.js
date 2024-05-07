import styled from "styled-components";

export const CategoryAccordeonCardContainer = styled.div`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
  padding: 2rem 1.5rem 2rem;

  h1 {
    text-align: center;
    font: var(--font_heading-1);
  }

  ul {
    background-color: var(--color_white);
    border-radius: var(--border-radius_card);
    box-shadow: var(--shadow_card);
    display: flex;
    flex-direction: column;
    justify-content: start;
    list-style: none;
  }
`;

export const Subcategory = styled.li`
  display: flex;
  justify-content: space-between;
`;
