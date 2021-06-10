import { createSelector } from '@reduxjs/toolkit';

const selectCountries = createSelector(
  (state) => state.common,
  (common) => common.countries || []
);

export { selectCountries };
