import styled from "styled-components";
import { Divider } from "../EventPreview/EventPreview.styled";
import Image from "next/image";

export const CommentDivider = styled(Divider)`
  width: 100%;
  margin: 1.875rem 0 1.5rem;
`;
export const ProfilePicture = styled(Image)`
  border-radius: var(--border-radius_round-button);
`;
export const CommentContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;
export const CommentHeader = styled.p`
  font: var(--font_label);
  margin-bottom: 1rem;
`;
export const CommentBody = styled.p`
  font: var(--font_info);
`;
