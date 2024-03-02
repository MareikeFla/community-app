import styled from "styled-components";
import Image from "next/image";

export const CategoryCardContainer = styled.li`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
`;

export const CategoryImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  border-top-left-radius: var(--border-radius_card);
  border-top-right-radius: var(--border-radius_card);
`;

export const CategoryInfoContainer = styled.section`
  padding: 0 0 0.75rem 0.75rem;
`;

export const CategoryInfoHeading = styled.h3`
  font: var(--font_heading-3);
  color: var(--color_night);
`;

export const CategoryInfo = styled.p`
  font: var(--font_info);
`;
