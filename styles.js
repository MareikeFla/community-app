import { createGlobalStyle } from "styled-components";
import { Nunito_Sans } from "next/font/google";

export const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default createGlobalStyle`
  :root {
    /* Color Styles */
    --color_white: #fff;
    --color_body: #f8f8f9;
    --color_light-grey: #d8d8d8;
    --color_grey: #838688;
    --color_night: #5b5f62;
    --color_midnight: #434648;
    --color_light-orange: #feb776;
    --color_orange: #fea554;
    --color_light-red: #f9847c;
    --color_red: #ff6e63;
    --color_input-bg: #f5f5f5;
    --color_sunset: linear-gradient(to top right, #fea554, #ff5e62);
    /* Font Styles */
    --font-family: ${nunito_sans.style.fontFamily};

    --font_heading-1: 600 1.25rem/1.35 var(--font-family);
    --font_heading-2: 600 1.125rem/1.56 var(--font-family);
    --font_heading-3: 800 0.875rem/1.36 var(--font-family);
    --font_heading-category: 900 1.25rem/1.35 var(--font-family);

    --font_body: 200 1rem/1.5 var(--font-family);
    --font_body-bold: 600 1rem/1.5 var(--font-family);
    --font_info: 300 0.875rem/1.43 var(--font-family);
    --font_label: 700 0.875rem/1.43 var(--font-family);
    --font_footer: 700 0.75rem/1.33 var(--font-family);
    --font_form-note: 400 0.75rem/1.023rem var(--font-family);

    --font_button-primary: 700 0.8125rem/1.38 var(--font-family);
    --font_button-secondary: 700 0.75rem/1.33 var(--font-family);
    
    /* Effect Styles */
    --border-radius_input: 3px;
    --border-radius_card: 6px;
    --border-radius_button: 30px;
    --border-radius_square-button: 6px;
    --border-radius_round-button: 50px;

    --shadow_card: 0px 2px 12px 0px rgba(91, 95, 98, 0.2);
    --shadow_round-button: 0px 2px 4px 0px rgba(91, 95, 98, 0.24);

    --transition_button: 0.3s;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color_body);
    font: var(--font_body);
    color: var(--color_grey);
    hyphens: auto;
    word-break: break-word;
    min-height: 100vh;
    position: relative;
  }
`;
