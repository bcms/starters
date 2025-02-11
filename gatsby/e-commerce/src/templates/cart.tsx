import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { CartPageContent } from '../types/page/cart';
import { Main } from '../components/cart-page/Main';

export interface CartTemplateProps {
    pageContext: CartPageContent;
}

const CartTemplate: React.FC<CartTemplateProps> = ({
    pageContext: { bcms },
}) => {
    return (
        <PageWrapper title={`Cart - Moda`}>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main bcms={bcms} />
            </div>
        </PageWrapper>
    );
};

export default CartTemplate;
