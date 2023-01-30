import styled from "styled-components";

import { TitleBar } from "./TitleBar";

export function Layout({ children }) {
  return (
    <Wrapper>
      <TitleBar></TitleBar>
      <StyledMain>{children}</StyledMain>
      <Footer>
        <Copyright>&copy; OM</Copyright>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  grid-template-rows: 80px auto 36px;
  height: 100vh;
`;

const StyledMain = styled.main`
  overflow-y: scroll;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1rem;
  color: var(--lightgrey-color);
`;
