import styled from "styled-components";
import Link from "next/link";

export const StyledLinkButton = styled(Link)`
  min-width: 8.8rem;
  min-height: 2.6rem;
  text-decoration: none;
  background-color: ${({ pageType }) =>
    pageType === "details-page"
      ? "var(--lightgrey-color)"
      : "var(--lost-pastel-color)"};
  border-radius: 0.6rem;
  padding: 0.6rem 2.4rem;
  font-family: var(--inter-font);
  font-size: 1.2rem;
  text-align: center;
  color: var(--font-color);
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;
