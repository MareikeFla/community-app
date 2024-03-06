import styled from "styled-components";
import Link from "next/link";

export const SearchMessage = styled.p`
  font: var(--font_h2);
  font-weight: 400;
  margin-bottom: -1.5rem;
  margin-top: -0.8rem;
`;

// SearchCard

export const SearchBox = styled.div`
  width: 100%;
  background-color: white;
  text-align: center;
  border-radius: var(--border-radius_card);
  padding-bottom: 1.6rem;
  box-shadow: var(--shadow_card);
`;

export const SearchHeader = styled.h2`
  font: var(--font_heading-2);
  padding: 2.5rem 1.8rem 1.2rem 2rem;
`;

export const SearchForm = styled.form`
  padding: 0 1.5rem;
`;

export const SearchBar = styled.input`
  font: var(--font_body);
  border: none;
  border-radius: var(--border-radius_input);
  background-color: #f5f5f5;
  background-image: url("/assets/icons/icon_search-grey.svg");
  background-size: 36px 36px;
  background-position: 0px center;
  background-repeat: no-repeat;
  padding: 5px 5px 5px 40px;
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
  top: 1.2rem;
  right: 1rem;
  background-color: var(--color_white) 20%;
  border: none;
  border-radius: var(--border-radius_square-button);
  box-shadow: var(--shadow_button);
  cursor: pointer;
`;
