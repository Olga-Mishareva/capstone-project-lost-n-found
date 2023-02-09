import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --lost-color: #ED5050;
    --lost-pastel-color: rgba(237, 80, 80, 0.5);
    --found-color: #3F7FCA;
    --found-pastel-color: rgba(63, 127, 202, 0.5);
    --inDiscuss-color: #EDCB50;
    --inDiscuss-pastel-color: rgba(237, 203, 80, 0.5);
    --finished-color: #448C74;
    --finished-pastel-color: rgba(68, 140, 116, 0.5);
    --font-color: #262626;
    --lightgrey-color: rgba(26, 26, 26, 0.4);
    --more-lightgrey-color: rgba(26, 26, 26, 0.3);
    --overlay-color: rgba(26, 26, 26, 0.7);
    --disabled-color: rgba(26, 26, 26, 0.1);
    --input-color: rgba(63, 127, 202, 0.1);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
    color: var(--font-color);
  }
`;
