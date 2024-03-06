import styled from "styled-components";
import Link from "next/link";

export const SearchMessage = styled.p`
  font: var(--font_h2);
  color: var(--color_night);
  font-weight: 500;
  margin-bottom: -1.5rem;
  margin-top: -0.75rem;
`;

// SearchCard

export const SearchBox = styled.div`
  width: 100%;
  background-color: white;
  text-align: center;
  color: var(--color_night);
  border-radius: var(--border-radius_card);
  padding: 3rem 1.5rem 2rem 1.5rem;
  box-shadow: var(--shadow_card);
`;

export const SearchHeader = styled.h2`
  font: var(--font_heading-1);
  margin-bottom: 1.625rem;
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
  padding: 0.563rem 1.375rem 0.563rem 2.625rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1.1875rem;
  right: 1rem;
  background-color: var(--color_white) 20%;
  border: none;
  border-radius: var(--border-radius_square-button);
  box-shadow: var(--shadow_button);
  cursor: pointer;
`;
