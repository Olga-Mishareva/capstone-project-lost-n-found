import styled from "styled-components";

import ConfirmPopup from "@/components/ConfirmPopup";

export default function Overlay({ onConfirm, onClose }) {
  return (
    <StyledOverlay onClick={onClose}>
      <ConfirmPopup variant="delete" onConfirm={onConfirm} onClose={onClose}>
        Do you really want to delete this item?
      </ConfirmPopup>
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--overlay-color);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
