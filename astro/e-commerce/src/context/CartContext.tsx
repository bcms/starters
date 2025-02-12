import type { PropMediaDataParsed } from '@thebcms/types';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
    ProductColorEntryMetaItem,
    ProductSizeEntryMetaItem,
} from '../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';

interface CartItem {
    slug: string;
    title: string;
    size: ProductSizeEntryMetaItem;
    color: ProductColorEntryMetaItem;
    price: number;
    cover: PropMediaDataParsed;
    amount: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addCartItem: (item: CartItem) => void;
    removeCartItem: (item: CartItem) => void;
    cartLength: number;
    totalCartPrice: number;
    bcms: ClientConfig;
    setBcms: React.Dispatch<React.SetStateAction<ClientConfig>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [bcms, setBcms] = useState<ClientConfig>({} as ClientConfig);

    const addCartItem = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (cartItem) =>
                    cartItem.slug === item.slug &&
                    cartItem.size.title === item.size.title &&
                    cartItem.color.title === item.color.title,
            );

            if (existingItem) {
                const updatedItems = prevItems.map((cartItem) => {
                    if (
                        cartItem.slug === item.slug &&
                        cartItem.size.title === item.size.title &&
                        cartItem.color.title === item.color.title
                    ) {
                        return { ...cartItem, amount: cartItem.amount + 1 };
                    }
                    return cartItem;
                });

                return updatedItems;
            } else {
                return [...prevItems, { ...item, amount: 1 }];
            }
        });
    };

    const removeCartItem = (item: CartItem) => {
        setCartItems((prevItems) => {
            const index = prevItems.findIndex(
                (cartItem) =>
                    cartItem.slug === item.slug &&
                    cartItem.size.title === item.size.title &&
                    cartItem.color.title === item.color.title,
            );

            if (index > -1) {
                if (prevItems[index].amount > 1) {
                    const updatedItems = prevItems.map((cartItem, i) => {
                        if (i === index) {
                            return { ...cartItem, amount: cartItem.amount - 1 };
                        }
                        return cartItem;
                    });

                    return updatedItems;
                } else {
                    const updatedItems = [...prevItems];
                    updatedItems.splice(index, 1);
                    return updatedItems;
                }
            }
            return prevItems;
        });
    };

    const cartLength = cartItems.reduce((acc, item) => acc + item.amount, 0);

    const totalCartPrice = cartItems
        .reduce((acc, item) => acc + item.price * item.amount, 0)
        .toFixed(2);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addCartItem,
                removeCartItem,
                cartLength,
                totalCartPrice: +totalCartPrice,
                bcms,
                setBcms,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
