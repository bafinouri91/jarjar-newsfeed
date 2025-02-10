import { createGlobalStyle } from 'styled-components';

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
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: bold;
        background: #ffcc00;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        background: #ffaa00;
    }
    `;

export default GlobalStyle;
