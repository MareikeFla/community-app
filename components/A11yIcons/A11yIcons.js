import { useData } from "@/lib/useData";
import IconWheelchair from "public/assets/icons/icon_wheelchair.svg";
import IconBlind from "public/assets/icons/icon_blind.svg";
import IconDeaf from "public/assets/icons/icon_deaf.svg";
import IconDog from "public/assets/icons/icon_dog.svg";
import IconLGBTQ from "public/assets/icons/icon_lgbtq.svg";
import IconFamily from "public/assets/icons/icon_family.svg";
import { A11yIconList } from "./A11yIcons.styled";
import FetchingError from "../FetchingError/FetchingError";

export const icons = {
  wheelchair: IconWheelchair,
  blind: IconBlind,
  deaf: IconDeaf,
  dog: IconDog,
  lgbtq: IconLGBTQ,
  family: IconFamily,
};

export default function A11yIcons({ a11yIcons }) {
  const {
    a11yIcons: fetchedIcons,
    isLoadingA11yIcons,
    errorA11yIcons,
  } = useData().fetchedA11yIcons;

  if (isLoadingA11yIcons) {
    return <Loading />;
  }

  if (errorA11yIcons) {
    return <FetchingError />;
  }

  if (!a11yIcons || a11yIcons.length === 0) {
    return null;
  }

  return (
    <A11yIconList>
      {a11yIcons.map((iconId) => {
        const fetchedIcon = fetchedIcons.find((item) => item._id === iconId);
        if (fetchedIcon && icons[fetchedIcon.icon]) {
          const A11yIcon = icons[fetchedIcon.icon];
          return (
            <div key={fetchedIcon._id}>
              <A11yIcon />
            </div>
          );
        } else {
          return null;
        }
      })}
    </A11yIconList>
  );
}
