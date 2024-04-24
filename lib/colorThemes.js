export const lightTheme = {
  base: "#fff", // --color_cards
  body: "#f8f8f9", // --color_body
  two: "#f5f5f5", // --color_pale_grey
  three: "#d8d8d8", // --color_light-grey
  four: "#737678", // --color_grey
  five: "#5b5f62", // --color_night
  six: "#434648", // --color_midnight
  seven: "#ffb169", //  --color_light-orange
  eight: "#ff9957", // --color_orange
  nine: "#f9847c", // --color_light-red
  ten: "#ff6e63", // --color_red
  eleven: "#4fb386", // --toastify-color-success
  gradientOne: "linear-gradient(to top right, #fea554, #ff5e62)", // --color_sunset
  categoryOne: "#ec495d", // --color_activism
  categoryTwo: "#a269b6", // --color_art
  categoryThree: "#22a5cb", // --color_education
  categoryFour: "#98bb4f", // --color_sport
  shadowOne: "rgba(91, 95, 98, 0.2)", // --shadow_card
  shadowTwo: "rgba(91, 95, 98, 0.24)", // --shadow_round-button
};

export const darkTheme = {
  base: "#02040A", // --color_base
  body: "#0D1116", // --color_body
  two: "#161B22", // --color_pale_grey
  three: "#2D3139", // --color_light-grey
  four: "#9a9e9f", // --color_grey
  five: "#b3b7b9", // --color_night
  six: "#E6EDF3", // --color_midnight
  seven: "#ffb169", //  --color_light-orange
  eight: "#ff9957", // --color_orange
  nine: "#f9847c", // --color_light-red
  ten: "#ff6e63", // --color_red
  eleven: "#4fb386", // --toastify-color-success
  gradientOne: "linear-gradient(to top right, #fea554, #ff5e62)", // --color_sunset
  categoryOne: "#ec495d", // --color_activism
  categoryTwo: "#a269b6", // --color_art
  categoryThree: "#22a5cb", // --color_education
  categoryFour: "#98bb4f", // --color_sport
  shadowOne: "rgba(91, 95, 98, 0.2)", // --shadow_card
  shadowTwo: "rgba(91, 95, 98, 0.24)", // --shadow_round-button
};

export function toggleTheme(theme) {
  if (theme === "light") {
    return { theme: "dark", colors: darkTheme };
  } else {
    return { theme: "light", colors: lightTheme };
  }
}

export const defaultTheme = { theme: "light", colors: lightTheme };
