import styled from "styled-components";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import SVGIcon from "@/components/SVGIcon";

export function TitleBar({ onToggle, listView, pathName }) {
  const { data: session } = useSession();

  return (
    <StyledHeader listView={listView} pathName={pathName}>
      {pathName === "/" ? (
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

      <Headline href="/" aria-label="headline">
        <LostSpan>Lost</LostSpan>-n-<FoundSpan>Found</FoundSpan>
      </Headline>

      <AuthToggleButton
        type="button"
        session={session}
        onClick={() => {
          session ? signOut() : signIn();
        }}
      >
        {!session ? (
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7em 0;
  border-bottom: ${({ listView, pathName }) =>
    pathName !== "/" || listView ? "3px solid var(--lightgrey-color)" : "none"};
`;

const ViewToggleButton = styled.button`
  position: absolute;
  top: 22px;
  left: 0;
  width: 48px;
  height: 48px;
  margin: 0;
  padding: ${({ listView }) => (!listView ? "0.25rem 0.2rem 0 0" : "0")};
  border: 3px solid var(--lightgrey-color);
  border-radius: 0.7em;
  background-color: #ffffff;
  cursor: pointer;
`;

const Headline = styled(Link)`
  text-decoration: none;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.2rem;
  color: var(--font-color);
  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;

const AuthToggleButton = styled.button`
  position: absolute;
  top: 22px;
  right: 0;
  width: 48px;
  height: 48px;
  border: 3px solid var(--lightgrey-color);
  border-radius: 0.7em;
  background-color: #ffffff;
  padding: ${({ session }) => (!session ? "0.15rem 0 0 .1rem" : "0.2rem 0 0")};
  cursor: pointer;
`;
