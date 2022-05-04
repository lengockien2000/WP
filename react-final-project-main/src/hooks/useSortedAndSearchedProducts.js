import { useReducer, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from 'store/productSlice';
import SortByConstant from 'constants/sortBy';

const ActionTypes = {
  SET_SORT_BY: 'SET_SORT_BY',
  SET_SEARCH: 'SET_SEARCH',
  SET_JUST_MOUNTED: 'SET_JUST_MOUNTED',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_SORT_BY:
      return { ...state, sortBy: action.sortBy };
    case ActionTypes.SET_SEARCH:
      return { ...state, search: action.search };
    case ActionTypes.SET_JUST_MOUNTED:
      return { ...state, justMounted: false };
    default:
      return state;
  }
};

const useSortedAndSearchedProducts = (
  initialSortBy = SortByConstant.RECENTLY_ADDED,
  initialSearch = '',
) => {
  const { isLoading, byIds, ids, isFirstLoad } = useSelector(
    (state) => state.product,
  );
  const [state, setState] = useReducer(reducer, {
    sortBy: initialSortBy,
    search: initialSearch,
    justMounted: true,
  });
  const productList = useMemo(
    () => (ids ? ids.map((id) => byIds[id]) : null),
    [ids, byIds],
  );
  const { sortBy, search, justMounted } = state;
  const dispatch = useDispatch();

  const setSortBy = useCallback((newSortBy) => {
    setState({ type: ActionTypes.SET_SORT_BY, sortBy: newSortBy });
  }, []);

  const setSearch = useCallback((newSearch) => {
    setState({ type: ActionTypes.SET_SEARCH, search: newSearch });
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(getProductList({ sortBy, search }));
    }, 500);

    // when user move to other page, and return to this one, we don't want to fetch again
    if (!isFirstLoad && justMounted) clearTimeout(debounce);
    setState({ type: ActionTypes.SET_JUST_MOUNTED });
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sortBy, search]);

  return {
    productList,
    isLoading,
    setSortBy,
    setSearch,
    sortBy,
    search,
    isFirstLoad,
  };
};

export default useSortedAndSearchedProducts;
