import styled, { css } from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SubmitButtonsSet({
  type,
  link,
  ariaLabel,
  buttonName,
  linkName,
  onOpen,
  variant,
  isMutating,
  onStopDiscuss,
  inDiscuss,
}) {
  const { data: session } = useSession();

  return (
    <SubmitButtonsWrapper variant={variant}>
      <StyledSubmitButton
        variant={variant}
        type={type}
        onClick={onOpen}
        disabled={isMutating}
      >
        {buttonName}
      </StyledSubmitButton>
      <StyledLinkButton
        variant={variant}
        href={session ? link : "/"}
        aria-label={ariaLabel}
        ismutating={isMutating ? "true" : ""}
        onClick={!session ? onOpen : inDiscuss ? onStopDiscuss : () => {}}
      >
        {linkName}
      </StyledLinkButton>
    </SubmitButtonsWrapper>
  );
}

const SubmitButtonsWrapper = styled.div`
  padding-top: 3rem;
  display: flex;
  column-gap: 1rem;
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
  background-color: var(--disabled-color);
  box-shadow: 5px 5px 15px 0px var(--more-lightgrey-color);
  transition: opacity 0.2s ease-in;

  :active {
    box-shadow: none;
  }

  :hover {
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s ease-in;
  }

  ${({ variant, ismutating }) =>
    variant === "details" &&
    ismutating !== "true" &&
    css`
      background-color: var(--lost-pastel-color);
    `};

  ${({ variant, ismutating }) =>
    variant === "form" &&
    ismutating !== "true" &&
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
  box-shadow: 5px 5px 15px 0px var(--more-lightgrey-color);
  transition: opacity 0.2s ease-in;

  :hover {
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s ease-in;
  }

  :active {
    box-shadow: none;
  }

  ${({ variant }) =>
    variant === "details" &&
    css`
      background-color: var(--more-lightgrey-color);
    `};

  ${({ variant }) =>
    variant === "form" &&
    css`
      background-color: var(--lost-pastel-color);
    `};
`;
