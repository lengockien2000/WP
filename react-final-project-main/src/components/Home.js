/* eslint-disable react/no-unescaped-entities */
import { EmptyState } from '@ahaui/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SortByConstant from 'constants/sortBy';
import useSortedAndSearchedProducts from 'hooks/useSortedAndSearchedProducts';
import { Device } from 'constants/mediaQuery';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ProductList from 'components/ProductList';

function Home() {
  const {
    isLoading,
    productList,
    setSortBy,
    setSearch,
    sortBy,
    search,
    isFirstLoad,
  } = useSortedAndSearchedProducts();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSortByChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  if (productList.length === 0 && isFirstLoad)
    return <LoadingSpinner isLoading />;

  return (
    <Wrapper data-testid="home-page">
      <Helmet>
        <title>Leo's shopping store</title>
        <meta name="description" content="Welcome to Leo's shopping store" />
      </Helmet>
      <LoadingSpinner isLoading={isLoading} />
      <SearchAndSortBy>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          data-testid="search-box"
        />
        <SortBy
          value={sortBy}
          onChange={handleSortByChange}
          data-testid="sort-by"
        >
          <SortOption value={SortByConstant.RECENTLY_ADDED}>
            Recently added
          </SortOption>
          <SortOption value={SortByConstant.PRICE_INCREASE}>
            Price increasing
          </SortOption>
          <SortOption value={SortByConstant.PRICE_DECREASE}>
            Price decreasing
          </SortOption>
        </SortBy>
      </SearchAndSortBy>
      {productList.length > 0 ? (
        <>
          <TitlesAndAddBtn>
            <ColumnTitles>
              <Title flex={5}>Name</Title>
              <Title flex={2}>Price (VND)</Title>
              <Title flex={1}>Image</Title>
            </ColumnTitles>
            <AddBtn to="/product/create">Add item</AddBtn>
          </TitlesAndAddBtn>
          <ProductList productList={productList} />
        </>
      ) : (
        <NotFoundWrapper>
          <EmptyState src="/assets/EmptyState.svg">
            <EmptyState.Heading>
              Can not found any item with name of "{search}"
            </EmptyState.Heading>
          </EmptyState>
        </NotFoundWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchAndSortBy = styled.div`
  width: 60%;
  margin: 12px 0;
  display: flex;

  @media ${Device.MOBILE} {
    width: 90%;
  }
`;

const SearchBox = styled.input`
  flex: 4;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid;
  border-right: none;
  font-size: var(--font-size);
  padding: 10px 20px;

  @media ${Device.MOBILE} {
    flex: 1;
    font-size: 14px;
  }
`;

const SortBy = styled.select`
  flex: 1;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  text-align: center;
  font-size: var(--font-size);

  @media ${Device.MOBILE} {
    font-size: 14px;
  }
`;

const SortOption = styled.option`
  font-size: var(--font-size);
`;

const TitlesAndAddBtn = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-end;
`;

const ColumnTitles = styled.div`
  margin-top: 20px;
  display: flex;
  width: 80%;
  gap: 10px;
`;

const Title = styled.div`
  flex: ${(prop) => prop.flex};
  height: 30px;
  padding: 0 20px;

  border: 1px solid;
  border-top-right-radius: 16px;
  border-top-left-radius: 4px;
  border-bottom: none;
  display: flex;
  align-items: center;
  font-size: var(--font-size);

  &:nth-child(2) {
    min-width: 80px;
  }

  &:last-child {
    min-width: 66px;
  }

  @media ${Device.TABLET} {
    padding: 0 10px;
    height: 40px;
  }

  @media ${Device.MOBILE} {
    padding: 0 4px;
    height: 48px;
  }
`;

const AddBtn = styled(Link)`
  width: 10%;
  border: 1px solid;
  border-radius: 16px;
  text-align: center;
  height: 30px;
  margin-right: 4.5%;
  font-size: var(--font-size);
  cursor: pointer;
  background-color: var(--colorPrimary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -10px;
  &:hover {
    color: white;
  }

  @media ${Device.TABLET} {
    padding-left: 6px;
    height: 44px;
  }

  @media ${Device.MOBILE} {
    padding-left: 2px;
    height: 52px;
  }
`;

const NotFoundWrapper = styled.div`
  position: relative;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export default Home;
