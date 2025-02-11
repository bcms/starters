import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { ProductPageContent } from '../types';
import { Main } from '../components/product-page/Main';

export interface ProductTemplateProps {
    pageContext: ProductPageContent;
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
    pageContext: { meta, otherProducts, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Moda`}>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <Main meta={meta} otherProducts={otherProducts} bcms={bcms} />
            </div>
        </PageWrapper>
    );
};

export default ProductTemplate;
