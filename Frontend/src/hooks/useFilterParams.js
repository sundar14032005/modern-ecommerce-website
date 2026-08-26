import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_FILTERS } from '../utils/constants';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current filters from URL searchParams
  const filters = useMemo(() => {
    return {
      query: searchParams.get('q') || DEFAULT_FILTERS.query,
      category: searchParams.get('category') || DEFAULT_FILTERS.category,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : DEFAULT_FILTERS.minPrice,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : DEFAULT_FILTERS.maxPrice,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : DEFAULT_FILTERS.minRating,
      vendor: searchParams.get('vendor') || DEFAULT_FILTERS.vendor,
      inStock: searchParams.get('inStock') === 'true',
      sort: searchParams.get('sort') || DEFAULT_FILTERS.sort,
      view: searchParams.get('view') || DEFAULT_FILTERS.view,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : DEFAULT_FILTERS.page
    };
  }, [searchParams]);

  // Update a single filter key
  const setFilter = useCallback(
    (key, value) => {
      setSearchParams((prevParams) => {
        const next = new URLSearchParams(prevParams);

        if (value === undefined || value === null || value === '' || value === DEFAULT_FILTERS[key]) {
          next.delete(key);
        } else {
          if (key === 'inStock') {
            if (value) next.set(key, 'true');
            else next.delete(key);
          } else {
            next.set(key, String(value));
          }
        }

        // Reset page to 1 on filter changes unless changing page itself
        if (key !== 'page') {
          next.delete('page');
        }

        return next;
      });
    },
    [setSearchParams]
  );

  // Update multiple filters at once
  const updateFilters = useCallback(
    (newFiltersObj) => {
      setSearchParams((prevParams) => {
        const next = new URLSearchParams(prevParams);
        Object.entries(newFiltersObj).forEach(([key, val]) => {
          if (val === undefined || val === null || val === '' || val === DEFAULT_FILTERS[key]) {
            next.delete(key);
          } else {
            if (key === 'inStock') {
              if (val) next.set(key, 'true');
              else next.delete(key);
            } else {
              next.set(key, String(val));
            }
          }
        });
        next.delete('page');
        return next;
      });
    },
    [setSearchParams]
  );

  // Reset all filters to default
  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  // Generate shareable URL string
  const getShareableUrl = useCallback(() => {
    return window.location.href;
  }, []);

  return {
    filters,
    setFilter,
    updateFilters,
    resetFilters,
    getShareableUrl
  };
};
