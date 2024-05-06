import styled from "styled-components";
import Image from "next/image";

export const ProfilePicture = styled(Image)`
  border-radius: var(--border-radius_round-button);
  object-fit: cover;
`;

export const ReplyContainer = styled.article`
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid var(--color_light-grey);
  padding: 1.5rem 0 1rem;
`;

export const ReplyHeader = styled.p`
  font: var(--font_label);
  color: var(--color_midnight);
  margin-bottom: 0.375rem;
  display: flex;
  gap: 0.375rem;
  align-items: flex-start;
`;

export const ReplyTime = styled.span`
  color: var(--color_grey);
`;

export const ReplyBody = styled.div`
  font: var(--font_info);
  margin-bottom: 0.375rem;
  display: flex;
  justify-content: space-between;

  button {
    align-self: end;
  }
`;
export const ReplyText = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FlexContainer = styled.div`
  align-items: ${(props) => props.align};
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.justify};
  flex-wrap: ${(props) => props.wrap};
  display: flex;
`;
