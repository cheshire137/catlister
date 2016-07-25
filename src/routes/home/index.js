import React from 'react';
import Home from './Home';

export const path = '/';
export const action = async (state) => {
  state.context.onSetTitle('Catlister');
  return <Home />;
};
