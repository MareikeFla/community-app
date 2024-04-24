import styled from "styled-components";
import SearchSVG from "/public/assets/icons/icon_search.svg";
import LogoSVG from "public/logo.svg";
import ArrowSVG from "/public/assets/icons/icon_arrow-up.svg";
import EditSVG from "/public/assets/icons/icon_edit.svg";
import DeleteSVG from "/public/assets/icons/icon_delete.svg";

export const SearchIcon = styled(SearchSVG)`
  :nth-child(2) {
    fill: ${({ $theme }) =>
      $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
  }

  :nth-child(3) {
    stroke: ${({ $theme }) =>
      $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
    stroke-width: 3px;
  }
`;

export const Logo = styled(LogoSVG)`
  fill: ${({ $theme }) =>
    $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
`;

export const Arrow = styled(ArrowSVG)`
  stroke: ${({ $theme }) =>
    $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
  stroke-width: 3px;
  stroke-linecap: round;
  transform: ${({ $direction }) =>
    ($direction === "up" && "rotate(0deg)") ||
    ($direction === "right" && "rotate(90deg)") ||
    ($direction === "down" && "rotate(180deg)") ||
    ($direction === "left" && "rotate(270deg)")};
`;

export const Edit = styled(EditSVG)`
  stroke: ${({ $theme }) =>
    $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
  stroke-width: 2px;

  :nth-child(1),
  :nth-child(2) {
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export const Delete = styled(DeleteSVG)`
  stroke: ${({ $theme }) =>
    $theme === "dark" ? "var(--color_pale_grey)" : "var(--color_base)"};
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
`;
