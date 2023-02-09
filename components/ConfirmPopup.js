import styled, { css } from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ConfirmPopup({
  onConfirm,
  onClose,
  variant,
  children,
  type,
}) {
  const { data: session } = useSession();

  return (
    <PopupWrapper
      variant={variant}
      onClick={(event) => event.stopPropagation()}
    >
      <ConfirmQuestion variant={variant}>{children}</ConfirmQuestion>
      <ButtonsWrapper>
        <Button
          type="button"
          variant="confirm"
          onClick={
            session
              ? () => {
                  onConfirm();
                  onClose();
                }
              : () => {
                  onClose();
                  signIn();
                }
          }
        >
          {session ? "Confirm" : "Login"}
        </Button>
        <Button type="button" variant="close" onClick={onClose}>
          Close
        </Button>
      </ButtonsWrapper>
    </PopupWrapper>
  );
}

const PopupWrapper = styled.div`
  min-width: 250px;
  min-height: 80px;

  ${({ variant }) =>
    variant === "delete" &&
    css`
      width: 320px;
      height: 200px;
      padding: 1.8rem;
      background-color: #ffffff;
      border-radius: 0.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: space-between;
    `};
`;

const ConfirmQuestion = styled.p`
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--inter-font);
  color: var(--font-color);

  ${({ variant }) =>
    variant === "delete" &&
    css`
      font-size: 1.1rem;
      font-weight: 700;
      text-align: center;
    `};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.8rem;
  min-width: 7rem;
  min-height: 2.5rem;
  font-weight: 500;
  font-family: var(--inter-font);

  ${({ variant }) =>
    variant === "confirm" &&
    css`
      background-color: var(--finished-pastel-color);
    `};
  ${({ variant }) =>
    variant === "close" &&
    css`
      background-color: var(--lost-pastel-color);
    `};
`;
