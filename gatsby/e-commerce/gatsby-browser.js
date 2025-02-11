import './src/styles/global.css';
import './src/styles/fonts.css';

import React from 'react';
import { CartProvider } from './src/context/CartContext';

export const wrapRootElement = ({ element }) => {
    return <CartProvider>{element}</CartProvider>;
};
