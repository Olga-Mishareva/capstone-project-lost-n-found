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
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.2rem;
  padding: 0.6em 0;
  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;
