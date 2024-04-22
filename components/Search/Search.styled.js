import styled from "styled-components";
import Link from "next/link";
// SearchCard

export const SearchBox = styled.div`
  width: 100%;
  background-color: var(--color_base);
  text-align: center;
  color: var(--color_five);
  border-radius: var(--border-radius_card);
  padding: 2rem 1.5rem 2rem 1.5rem;
  box-shadow: var(--shadow_one);
`;

export const SearchCardHeader = styled.h1`
  font: var(--font_heading-1);
  margin-bottom: 1.438rem;
`;

export const SearchBar = styled.input`
  color: var(--color_four);
  font: var(--font_body);
  border-radius: var(--border-radius_input);
  background-color: var(--color_two);
  border: none;
  background-image: url("/assets/icons/icon_search-grey.svg");
  background-size: 2.25rem 2.25rem;
  background-position: 0px center;
  background-repeat: no-repeat;
  padding: 0.5rem 1.75rem 0.5rem 2.688rem;
  width: 100%;

  &::placeholder {
    color: var(--color_four);
  }

  &:focus {
    outline: 2px solid var(--color_eight);
  }
`;

// SearchLink

export const SearchLinkStyled = styled(Link)`
  position: absolute;
  top: 1.125rem;
  right: 1rem;
  cursor: pointer;
`;
