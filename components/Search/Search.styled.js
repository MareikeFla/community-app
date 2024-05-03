import styled from "styled-components";
import Link from "next/link";
import { A11yIconList } from "../A11yIcons/A11yIcons.styled";
// SearchCard

export const SearchBox = styled.div`
  width: 100%;
  background-color: white;
  text-align: center;
  color: var(--color_night);
  border-radius: var(--border-radius_card);
  padding: 2rem 1.5rem 2rem 1.5rem;
  box-shadow: var(--shadow_card);
`;

export const SearchCardHeader = styled.h1`
  font: var(--font_heading-1);
  margin-bottom: 1.438rem;
`;

export const SearchBar = styled.input`
  font: var(--font_body);
  border: none;
  border-radius: var(--border-radius_input);
  background-color: #f5f5f5;
  background-image: url("/assets/icons/icon_search-grey.svg");
  background-size: 2.25rem 2.25rem;
  background-position: 0px center;
  background-repeat: no-repeat;
  padding: 0.5rem 1.75rem 0.5rem 2.688rem;
  width: 100%;
  color: var(--color_grey);

  &::placeholder {
    color: var(--color_grey);
  }

  &:focus {
    outline: 2px solid var(--color_orange);
  }
`;

// SearchLink

export const SearchLinkStyled = styled(Link)`
  position: absolute;
  top: 1.125rem;
  right: 1rem;
  cursor: pointer;
`;

export const IconWrap = styled.div`
  background-color: ${({ $isSelected }) =>
    $isSelected === false || $isSelected === undefined
      ? "var(--color_light-grey)"
      : "var(--color_light-orange)"};

  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const ListColumn = styled(A11yIconList)`
  flex-direction: column;
  align-items: flex-start;
`;
export const ListRow = styled(A11yIconList)`
  margin-top: 0.75rem;
`;

export const FilterHeading = styled.p`
  font: var(--font_body);
  font-size: 1rem;
  font-weight: 300;
`;

export const FilterReset = styled.p`
  color: var(--color_orange);
  cursor: pointer;
  font: var(--font_body);
  font-size: 0.75rem;
  font-weight: 300;
`;

export const CategoryFilterTag = styled.span`
  width: 150px;
  font: var(--font_tag);
  background-color: ${({ $isSelected, color }) =>
    $isSelected === false || $isSelected === undefined
      ? "var(--color_light-grey)"
      : `var(--color_${color})`};
  color: var(--color_white);
  text-transform: uppercase;
  border: none;
  border-radius: var(--border-radius_button);
  padding: 0.375rem 0.625rem 0.3125rem;
  cursor: pointer;
`;
