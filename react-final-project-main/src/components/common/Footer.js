import * as React from 'react';
import styled from 'styled-components';

function Footer() {
  return <Wrapper>Created by group 8</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: min(10vh, 50px);
  border-top: 1px solid rgb(217, 218, 220);
  width: 100%;
`;

export default Footer;
