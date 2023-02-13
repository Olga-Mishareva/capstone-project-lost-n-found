import styled, { css } from "styled-components";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import SVGIcon from "@/components/SVGIcon";

export function TitleBar({ onToggle, listView, pathName }) {
  const { data: session } = useSession();

  return (
    <StyledHeader listView={listView} pathName={pathName}>
      {pathName === "/" ? (
        <TitleBarButton
          type="button"
          variant="view"
          listView={listView}
          onClick={onToggle}
        >
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
        </TitleBarButton>
      ) : (
        <></>
      )}

      <Headline href="/" aria-label="headline">
        <LostSpan>Lost</LostSpan>-n-<FoundSpan>Found</FoundSpan>
      </Headline>

      <TitleBarButton
        type="button"
        variant="auth"
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
      </TitleBarButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7em 0;
  margin: 0 1rem;
  border-bottom: ${({ listView, pathName }) =>
    pathName !== "/" || listView ? "3px solid var(--lightgrey-color)" : "none"};
`;

const TitleBarButton = styled.button`
  position: absolute;
  top: 22px;
  width: 48px;
  height: 48px;
  margin: 0;
  border: 3px solid var(--grey-color);
  border-radius: 0.7em;
  background-color: transparent;
  cursor: pointer;
  box-shadow: 5px 5px 10px 0px var(--disabled-color);

  ${({ variant }) =>
    variant === "view" &&
    css`
      left: 0;
      padding: ${({ listView }) => (!listView ? "0.25rem 0.2rem 0 0" : "0")};
    `};

  ${({ variant }) =>
    variant === "auth" &&
    css`
      right: 0;
      padding: ${({ session }) =>
        !session ? "0.15rem 0 0 .1rem" : "0.2rem 0 0"};
    `};
`;

const Headline = styled(Link)`
  text-decoration: none;
  margin: 0;
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 2.2rem;
  color: var(--grey-color);
  text-align: center;
`;

const LostSpan = styled.span`
  color: var(--lost-color);
`;

const FoundSpan = styled.span`
  color: var(--found-color);
`;
