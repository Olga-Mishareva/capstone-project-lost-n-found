import styled from "styled-components";

export const StyledSubmitButton = styled.button`
  min-width: 8.8rem;
  min-height: 2.6rem;
  border: none;
  color: var(--font-color);
  background-color: ${({ pagetype }) =>
    pagetype === "add-form"
      ? "var(--finished-pastel-color)"
      : "var(--lost-pastel-color)"};

  /* border: 3px solid var(--lost-pastel-color); */
  border-radius: 0.6rem;
  padding: 0.6rem 2.4rem;
  font-family: var(--inter-font);
  font-size: 1.2rem;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;
