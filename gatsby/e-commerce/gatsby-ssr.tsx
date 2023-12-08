import React from 'react';
import { CartProvider } from './src/context/CartContext';

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);
