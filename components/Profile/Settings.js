import { H2, Text } from "../Fonts/Fonts.styled";
import { FlexBox } from "../WrapsAndBoxes.js/FlexBox.styled";
import ColorSwitch from "./ColorSwitch";
import { useTheme } from "styled-components";
import { ProfileSection } from "./Profile.styled";

export default function Settings({ id, updateColorTheme }) {
  const { theme, toggleColorTheme } = useTheme();
  return (
    <ProfileSection $direction={"column"} id={id}>
      <H2 $margin={"0.75rem 0 0.5rem 0"}>Farbschema</H2>
      <FlexBox $gap={"10px"} $align={"center"} $margin={"0 0 1rem 0"}>
        <Text>Hell</Text>
        <ColorSwitch
          isChecked={theme === "dark"}
          onChange={async () => {
            toggleColorTheme(theme);
            await updateColorTheme(theme === "light" ? "dark" : "light");
          }}
        ></ColorSwitch>
        <Text>Dunkel</Text>
      </FlexBox>
    </ProfileSection>
  );
}
