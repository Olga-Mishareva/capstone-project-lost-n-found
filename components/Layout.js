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
  display: grid;
  grid-template-rows: 70px auto 36px;
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
  padding: 10px 20px;
  font-size: 14px;
  line-height: 16px;
  color: rgba(26, 26, 26, 0.3);
`;
