import { StyledFooter, FooterLinkContainer, FooterLink } from "./Footer.styles";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterLinkContainer>
        <FooterLink href="/imprint">Impressum</FooterLink>
        <FooterLink href="/privacy-policy">Datenschutz</FooterLink>
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkContainer>
    </StyledFooter>
  );
}
