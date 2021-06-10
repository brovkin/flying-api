import { createSelector } from '@reduxjs/toolkit';

const parrotsSelector = createSelector(
  (state) => state.parrots,
  (parrots) => parrots || []
);

export { parrotsSelector };
