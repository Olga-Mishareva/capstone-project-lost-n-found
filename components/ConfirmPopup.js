import styled, { css } from "styled-components";

export default function ConfirmPopup({ onConfirm, onClose, variant }) {
  return (
    <Wrapper variant={variant} onClick={(event) => event.stopPropagation()}>
      <ConfirmQuestion variant={variant}>
        {variant === "delete"
          ? "Do you really want to delete this item?"
          : "Do you want to notice new item?"}
      </ConfirmQuestion>
      <ButtonsWrapper>
        <Button type="button" variant="confirm" onClick={onConfirm}>
          Confirm
        </Button>
        <Button type="button" variant="close" onClick={onClose}>
          Close
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 200px;
  min-height: 70px;

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
      position: fixed;
      top: calc((100% - 150px) / 2);
      left: calc((100% - 320px) / 2);
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
  border-radius: 0.3rem;
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
