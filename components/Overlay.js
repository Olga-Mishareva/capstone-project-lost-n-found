import styled from "styled-components";

import ConfirmPopup from "@/components/ConfirmPopup";
import useConfirmStore from "@/hooks/useConfirmStore";

export default function Overlay({ onDelete }) {
  const handleClosePopup = useConfirmStore((state) => state.handleClosePopup);

  return (
    <StyledOverlay onClick={handleClosePopup}>
      <ConfirmPopup variant="delete" onDelete={onDelete} />
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
