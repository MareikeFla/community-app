import styled from "styled-components";
import { MapContainer, Popup } from "react-leaflet";

export const StyledMapContainer = styled(MapContainer)`
  grid-column: 1 / span 2;
  width: 100%;
  height: 12.5rem;
  margin-top: 0.5rem;
  border-radius: var(--border-radius_card);
  z-index: 0;
`;

export const StyledPopup = styled(Popup)`
  border-radius: var(--border-radius_card);
`;

export const PopupHeader = styled.span`
  font: var(--font_heading-3);
  font-weight: 600;
`;
export const PopupBody = styled.span`
  font: var(-font_info);
`;
