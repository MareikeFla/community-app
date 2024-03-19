import styled from "styled-components";

export const EventFormContainerStyled = styled.div`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
  padding: ${(props) =>
    props.pageNotFound ? "3rem 1.5rem 2.75rem" : "3rem 1.5rem 2rem"};
`;
export const EventFormTitle = styled.p`
  font: var(--font_heading-1);
  text-align: center;
  color: var(--color_night);
`;
