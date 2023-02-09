import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

import SVGIcon from "@/components/SVGIcon";

export function TitleBar({ onToggle, listView, showViewButton }) {
  const { data: session } = useSession();
  return (
    <StyledHeader listView={listView}>
      {showViewButton ? (
        <ViewToggleButton type="button" listView={listView} onClick={onToggle}>
          {listView ? (
            <SVGIcon
              variant="map"
              width="32px"
              height="32px"
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

      <AuthToggleButton type="button" onClick={() => {}}>
        {!listView ? (
          <SVGIcon
            variant="login"
            width="36px"
            height="36px"
            label="login"
            color="var(--lightgrey-color)"
          />
        ) : (
          <SVGIcon
            variant="logout"
            width="36px"
            height="36px"
            label="logout"
            color="var(--lightgrey-color)"
          />
        )}
      </AuthToggleButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0 0.5rem;
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

  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;

const AuthToggleButton = styled.button`
  width: 48px;
  height: 48px;
  border: 3px solid var(--lightgrey-color);
  border-radius: 0.7em;
  background-color: #ffffff;
  padding: 0.1rem 0.1rem 0 0;
`;
