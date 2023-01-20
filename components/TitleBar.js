import styled from "styled-components";

export function TitleBar() {
  return (
    <StyledHeader>
      <Headline>
        <LostSpan>Lost</LostSpan>-n-<FoundSpan>Found</FoundSpan>
      </Headline>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.h1`
  margin: 0;
  font-weight: 600;
  line-height: 40px;
  width: 85%;
  border-bottom: 2px solid rgba(26, 26, 26, 0.3);
  padding: 20px 0;
  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;
