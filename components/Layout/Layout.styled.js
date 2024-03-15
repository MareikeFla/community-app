import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 80rem;
  padding: 0 1rem;
  margin: auto;
  position: relative;
  z-index: 1;
`;

export const MainContent = styled.main`
  position: relative;
  top: 4.5rem;
  display: flex;
  flex-direction: column;
`;

export const LogoHeader = styled.div`
  position: absolute;
  top: 1.625rem;
  left: 50%;
  transform: translateX(-50%);
`;
