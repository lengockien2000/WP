/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Sorry, Leo couldn't find this page</title>
        <meta name="description" content="Sorry, Leo couldn't find this page" />
      </Helmet>
      <Notification data-testid="not-found-page">
        Page not found ...
      </Notification>
    </>
  );
}

const Notification = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PageNotFound;
