import styled from "styled-components";

export function TitleBar() {
  return (
    <StyledHeader>
      <Headline>Lost-n-Found</Headline>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.h1`
  font-weight: 700;
  width: 85%;
  border-bottom: 2px solid rgba(26, 26, 26, 0.3);
  padding: 15px 0;
  text-align: center;
`;
