import { createSelector } from '@reduxjs/toolkit';

const authSelector = createSelector(
  (state) => state.auth,
  (auth) => auth || {}
);

const userSelector = createSelector(authSelector, (auth) => auth.user || {});

export { authSelector, userSelector };
