import './src/assets/css/main.css';
import './src/assets/css/reset.css';
import './src/assets/css/transition.css';
import './src/assets/css/fonts.css';
import './src/assets/css/prose.css';
import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { CartProvider } from './src/context/CartContext';

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>;
};
