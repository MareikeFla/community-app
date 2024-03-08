import styled from "styled-components";
import { Divider } from "../EventPreview/EventPreview.styled";
import Image from "next/image";

export const ProfilePicture = styled(Image)`
  border-radius: var(--border-radius_round-button);
  object-fit: cover;
`;

export const CommentContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid var(--color_light-grey);
  padding: 1.5rem 0 1.375rem;
`;

export const CommentHeader = styled.p`
  font: var(--font_label);
  color: var(--color_midnight);
  margin-bottom: 0.375rem;
`;

export const CommentBody = styled.p`
  font: var(--font_info);
`;
