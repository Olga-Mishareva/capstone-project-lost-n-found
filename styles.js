import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --lost-color: #ED5050;
    --found-color: #3F7FCA;
    --finished-color: #448C74;
    --font-color: #262626;
  }

  body {
    margin: 0;
    font-family: system-ui;
    color: var(--font-color);
  }
`;
