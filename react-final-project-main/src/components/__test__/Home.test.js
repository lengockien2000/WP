/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import Home from 'components/Home';
import { render, screen, resetReduxProductState } from 'utils/test';
import * as mock from 'mocks/mockForTesting';

afterEach(() => {
  resetReduxProductState();
});

describe('Test for successful interactions in Home.js', () => {
  it('Should show product list at first and then should show sorted product when Sort By option changed and searched product when search box change', async () => {
    // render component
    render(<Home />);

    // expect loading spinner
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect to show product list
    expect(screen.getByText(mock.productList[0].title)).toBeInTheDocument();

    // choose sort by price decreasing
    userEvent.selectOptions(screen.getByTestId('sort-by'), ['PRICE_DECREASE']);

    // expect to show sorted product list
    await waitFor(() =>
      expect(
        screen.getByText(mock.priceDecreaseProductList[0].title),
      ).toBeInTheDocument(),
    );

    // type search info
    userEvent.type(screen.getByTestId('search-box'), 'search');

    // expect to show searched product list
    await waitFor(() =>
      expect(
        screen.getByText(mock.searchedProductList[0].title),
      ).toBeInTheDocument(),
    );
  });
});
