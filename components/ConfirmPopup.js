import styled, { css } from "styled-components";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConfirmPopup({
  onConfirm = () => {},
  onClose,
  variant,
  children,
}) {
  const { data: session } = useSession();
  const router = useRouter();

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
                  // router.push("/");
                  onClose();
                  signIn();
                }
          }
        >
          {session ? "Confirm" : "Login"}
        </Button>
        <Button
          type="button"
          variant="close"
          onClick={
            session
              ? onClose
              : () => {
                  onClose();
                  router.push("/");
                }
          }
        >
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
  color: var(--font-color);
  border-radius: 0.5rem;
  min-width: 7rem;
  min-height: 2.5rem;
  font-weight: 500;
  font-family: var(--inter-font);
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
