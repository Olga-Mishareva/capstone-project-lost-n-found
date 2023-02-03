import styled from "styled-components";

import SVGIcon from "@/components/SVGIcon";

export function TitleBar({ onToggle, listView, pathName }) {
  return (
    <StyledHeader listView={listView}>
      {pathName === "/" ? (
        <ViewToggleButton type="button" listView={listView} onClick={onToggle}>
          {listView ? (
            <SVGIcon
              variant="map"
              width="36px"
              height="36px"
              label="map"
              color="var(--lightgrey-color)"
            />
          ) : (
            <SVGIcon
              variant="list"
              width="36px"
              height="36px"
              label="list"
              color="var(--lightgrey-color)"
            />
          )}
        </ViewToggleButton>
      ) : (
        <></>
      )}

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
  border-bottom: ${({ listView }) =>
    listView ? "3px solid var(--lightgrey-color)" : "none"};
`;

const ViewToggleButton = styled.button`
  width: 48px;
  height: 48px;
  margin: 0;
  padding: ${({ listView }) => (!listView ? "0.25rem 0.2rem 0 0" : "0")};
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
