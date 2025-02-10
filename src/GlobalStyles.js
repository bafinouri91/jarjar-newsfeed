import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'StarJedi';
    src: url('./fonts/Starjedi.ttf') format('truetype');
  }

   body {
    background: url('/naboobackground.png');
    background-size: cover;
    font-family: 'Arial', sans-serif;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
`;

export default GlobalStyle;
