'use client';

import type {
    ProductColorEntryMetaItem,
    ProductSizeEntryMetaItem,
} from '@bcms-types/types/ts';
import type { PropMediaDataParsed } from '@thebcms/types';
import React, { createContext, useContext, ReactNode, useState } from 'react';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
