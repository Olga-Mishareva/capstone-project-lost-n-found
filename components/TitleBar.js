import styled from "styled-components";

import SVGIcon from "@/components/SVGIcon";

export function TitleBar({ onToggle, listView }) {
  console.log(listView);
  return (
    <StyledHeader>
      <ViewToggleButton type="button" onClick={onToggle}>
        {listView ? (
          <SVGIcon
            variant="map"
            width="48px"
            height="48px"
            label="map"
            color="var(--font-color)"
          />
        ) : (
          <SVGIcon
            variant="list"
            width="48px"
            height="48px"
            label="list"
            color="var(--font-color)"
          />
        )}
      </ViewToggleButton>
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

  // !!!!! prop listView is not working for styles!!! ?????

  /* border-bottom: ${({ listView }) =>
    !listView ? "none" : "3px solid var(--lightgrey-color)"}; */
`;

const ViewToggleButton = styled.button`
  width: 48px;
  height: 48px;
  margin: 0;
  padding: 0;
  border: 3px solid var(--lightgrey-color);
  border-radius: 0.7em;
  background-color: #ffffff;
`;

const Headline = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.2rem;
  padding: 0.6em 0 0.6em 0.6em;
  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;
