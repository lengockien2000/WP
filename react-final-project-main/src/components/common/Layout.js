import * as React from 'react';
import styled from 'styled-components';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  flex: 1 999999;
  width: var(--wrapper-width);
  position: relative;
`;

export default Layout;
