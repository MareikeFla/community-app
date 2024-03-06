import styled from "styled-components";

export const Card = styled.li`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
  padding: 1.25rem 1.5rem 0.313rem;
`;

export const PreviewTitle = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
  margin-bottom: 0.375rem;
`;

export const PreviewDescription = styled.p`
  font: var(--font_body);
  margin-bottom: 1.125rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.438rem;
  gap: 0.75rem;
`;

export const Icon = styled.img`
  margin-right: 0.188rem;
`;

export const Info = styled.p`
  font: var(--font_info);
  color: var(--color_grey);
`;

export const Divider = styled.div`
  height: 0.063rem;
  background-color: var(--color_light-grey);
  width: calc(100% + 3rem);
  margin: 1.125rem -1.5rem 0;
`;
