import styled, { css } from "styled-components";

export default function ConfirmPopup({ onConfirm, onClose }) {
  return (
    <Wrapper onClick={(event) => event.stopPropagation()}>
      <ConfirmQuestion>Do you want to notice new item? </ConfirmQuestion>
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
  height: 70px;
`;

const ConfirmQuestion = styled.p`
  font-size: 1rem;
  font-weight: 700;
  font-family: var(--inter-font);
  color: var(--font-color);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.3rem;
  min-width: 7rem;
  min-height: 2rem;
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
