/* eslint-disable react/no-unescaped-entities */
import { EmptyState, Button } from '@ahaui/react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function FallbackComponent({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleResetErrorBoundary = () => {
    navigate('/home');
    resetErrorBoundary();
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Something when wrong with Leo's store</title>
        <meta
          name="description"
          content="Something when wrong with Leo's store"
        />
      </Helmet>
      <EmptyState src="/assets/EmptyState.svg">
        <EmptyState.Heading>There was an error:</EmptyState.Heading>
        <EmptyState.Description>{error.message}</EmptyState.Description>
        <Button variant="secondary" onClick={handleResetErrorBoundary}>
          Try again
        </Button>
      </EmptyState>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  top: 20vh;
  text-align: center;
`;

export default FallbackComponent;
