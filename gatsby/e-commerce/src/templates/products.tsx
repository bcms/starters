import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ProductsPageContent } from '../types';
import { Main } from '../components/products/Main';

export interface ProductsTemplateProps {
    pageContext: ProductsPageContent;
}

const ProductsTemplate: React.FC<ProductsTemplateProps> = ({
    pageContext: { products, genders, categories, brands, bcms },
}) => {
    return (
        <PageWrapper title={`Products - Moda`}>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main
                    products={products}
                    genders={genders}
                    categories={categories}
                    brands={brands}
                    bcms={bcms}
                />
            </div>
        </PageWrapper>
    );
};

export default ProductsTemplate;
