import styled from "styled-components";

import { TitleBar } from "./TitleBar";

export function Layout({ children, onToggle, listView, pathName }) {
  return (
    <Wrapper>
      <TitleBar onToggle={onToggle} listView={listView} pathName={pathName} />
      <StyledMain>{children}</StyledMain>
      <Footer>
        <Copyright>&copy; OM</Copyright>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 90px auto 36px;
  height: 100vh;
  position: relative;
`;

const StyledMain = styled.main`
  overflow-y: scroll;
  margin: 0 auto;
  padding: 0 1rem;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1rem;
  color: var(--lightgrey-color);
`;
