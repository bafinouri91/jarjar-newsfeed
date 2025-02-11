import { createGlobalStyle } from 'styled-components';

// Defines global styles applied throughout the application
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

     button {
    background: rgba(255, 255, 255, 0.2);
    color:#1a237e;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 10px 15px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
      color: white
    }
  }
`;



export default GlobalStyle;
