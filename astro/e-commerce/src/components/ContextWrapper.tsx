import { type PropsWithChildren } from 'react';
import { CartProvider } from '../context/CartContext';

const ContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return <CartProvider>{children}</CartProvider>;
};

export default ContextWrapper;
