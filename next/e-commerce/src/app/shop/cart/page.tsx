import React from 'react';
import { Metadata } from 'next';
import { bcms } from '@/app/bcms-client';
import { Main } from './components/Main';

const pageTitle = 'Cart - Moda';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const CartPage: React.FC = async () => {
    return (
        <div>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main bcms={bcms.getConfig()} />
            </div>
        </div>
    );
};

export default CartPage;
