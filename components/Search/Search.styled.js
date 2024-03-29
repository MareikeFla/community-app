import styled from "styled-components";
import Link from "next/link";

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
