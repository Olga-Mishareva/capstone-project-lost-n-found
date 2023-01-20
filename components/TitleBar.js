import styled from "styled-components";

export function TitleBar() {
  return (
    <StyledHeader>
      <StyledHeadline>Lost-n-Found</StyledHeadline>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  border-bottom: 2px solid rgba(26, 26, 26, 0.2);
`;

const StyledHeadline = styled.h1`
  font-weight: 800;
`;
