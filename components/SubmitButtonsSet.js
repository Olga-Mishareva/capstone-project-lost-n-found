import styled, { css } from "styled-components";
import Link from "next/link";

export default function SubmitButtonsSet({
  type,
  pagetype,
  link,
  ariaLabel,
  buttonName,
  linkName,
  onDelete,
  variant,
}) {
  return (
    <SubmitButtonsWrapper variant={variant}>
      <StyledSubmitButton
        variant={variant}
        type={type}
        onClick={onDelete}
        pagetype={pagetype}
      >
        {buttonName}
      </StyledSubmitButton>
      <StyledLinkButton
        variant={variant}
        href={link}
        aria-label={ariaLabel}
        pagetype={pagetype}
      >
        {linkName}
      </StyledLinkButton>
    </SubmitButtonsWrapper>
  );
}

const SubmitButtonsWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ variant }) =>
    variant === "details" &&
    css`
      flex-direction: row;
    `};

  ${({ variant }) =>
    variant === "form" &&
    css`
      flex-direction: row-reverse;
    `};
`;

const StyledSubmitButton = styled.button`
  min-width: 8.8rem;
  min-height: 2.6rem;
  border: none;
  color: var(--font-color);
  border-radius: 0.6rem;
  padding: 0.6rem 2.4rem;
  font-family: var(--inter-font);
  font-size: 1.2rem;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }

  ${({ variant }) =>
    variant === "details" &&
    css`
      background-color: var(--lost-pastel-color);
    `};

  ${({ variant }) =>
    variant === "form" &&
    css`
      background-color: var(--finished-pastel-color);
    `};
`;

export const StyledLinkButton = styled(Link)`
  min-width: 8.8rem;
  min-height: 2.6rem;
  text-decoration: none;
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

  ${({ variant }) =>
    variant === "details" &&
    css`
      background-color: var(--lightgrey-color);
    `};

  ${({ variant }) =>
    variant === "form" &&
    css`
      background-color: var(--lost-pastel-color);
    `};
`;