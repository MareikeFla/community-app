import { createGlobalStyle } from "styled-components";
import { Nunito_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

export const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default createGlobalStyle`
  *,
   *::before,
   *::after {
     margin: 0;
     padding: 0;
    box-sizing: border-box;
   }


  :root {
    ${(props) => {
      const { colors } = props.theme;

      return `
    /* Color Styles */
    --color_base: ${colors.base}; // --color_white
    --color_body: ${colors.body}; //  --color_body
    --color_pale_grey: ${colors.two}; // --color_pale_grey
    --color_light-grey: ${colors.three}; // --color_light-grey
    --color_grey: ${colors.four}; // --color_grey
    --color_night: ${colors.five} ; // --color_night
    --color_midnight: ${colors.six}; // --color_midnight
    --color_light-orange: ${colors.seven}; //  --color_light-orange
    --color_orange: ${colors.eight}; // --color_orange
    --color_light-red: ${colors.nine}; // --color_light-red
    --color_red: ${colors.ten} ; // --color_red
    --color_sunset: ${colors.gradientOne}; // --color_sunset

    --color_activism: ${colors.categoryOne}; 
    --color_art:${colors.categoryTwo} ; 
    --color_education: ${colors.categoryThree}; 
    --color_sport:${colors.categoryFour} ; 

    /* Font Styles */
    --font-family: ${nunito_sans.style.fontFamily}; // --font-family

    --font_heading-1: 600 1.25rem/1.35 var(--font-family); // --font_heading-1
    --font_heading-2: 600 1.125rem/1.56 var(--font-family); //--font_heading-2
    --font_heading-3: 800 0.875rem/1.36 var(--font-family); //--font_heading-3
    --font_heading-category: 800 1.25rem/1.35 var(--font-family); //--font_heading-category

    --font_body: 300 1rem/1.5 var(--font-family); // --font_body
    --font_info: 300 0.875rem/1.43 var(--font-family); // --font_info
    --font_label: 600 0.875rem/1.43 var(--font-family); //  --font_label
    --font_footer: 700 0.75rem/1.33 var(--font-family); // --font_footer
    --font_form-note: 400 0.75rem/1.023rem var(--font-family); // --font_form-note

    --font_button: 700 0.8125rem/1.38 var(--font-family); // --font_button
    --font_tag: 700 0.75rem/1.33 var(--font-family); // --font_tag

    @media (min-width: 768px) {
      --font_heading-1: 600 1.5rem/1.35 var(--font-family); // --font_heading-1
      --font_heading-category: 800 1.5rem/1.35 var(--font-family); //--font_heading-category
    }

    @media (min-width: 1024px) {
      --font_heading-1: 600 1.75rem/1.35 var(--font-family); //--font_heading-1
      --font_heading-category: 800 1.75rem/1.35 var(--font-family); //--font_heading-category
    }

    /* Effect Styles */
    --border-radius_input: 3px; // --border-radius_input
    --border-radius_card: 6px; // --border-radius_card
    --border-radius_button: 30px; // --border-radius_button
    --border-radius_square-button: 6px; // --border-radius_square-button
    --border-radius_round-button: 50px; // --border-radius_round-button

    --shadow_one: 0px 2px 12px 0px ${colors.shadowOne} ; // --shadow_card
    --shadow_two: 0px 2px 4px 0px ${colors.shadowTwo}; // --shadow_round-button

    --transition_button: 0.3s; //  --transition_button

    /* Toasts */
    --toastify-color-success:${colors.eleven} ;
    --toastify-color-error: ${colors.ten}; 

    /* Loading Animation */
    --animation_speed: 2s; // --animation_speed
      `;
    }}
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
