import styled from "styled-components";

import ConfirmPopup from "@/components/ConfirmPopup";

export default function Overlay() {
  return (
    <StyledOverlay>
      <ConfirmPopup variant="delete" />
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--lightgrey-color);
  position: fixed;
  top: 0;
  left: 0;
`;
