import { HeaderBackground, HeaderCutout } from "./Header.styles";

export default function Header() {
  return (
    <HeaderBackground>
      <HeaderCutout
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon fill="var(--color_one)" points="0,0 0,100 100,100" />
      </HeaderCutout>
    </HeaderBackground>
  );
}
