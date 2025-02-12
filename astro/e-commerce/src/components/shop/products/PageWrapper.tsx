import ContextWrapper from '../../ContextWrapper';
import InnerPageWrapper from '../../InnnerPageWrapper';
import type { ClientConfig } from '@thebcms/client';
import { Main } from './Main';
import type { ProductLite } from '../../../utils/product';
import type {
    ProductBrandEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '../../../../bcms/types/ts';

interface Props {
    data: {
        products: ProductLite[];
        genders: ProductGenderEntryMetaItem[];
        categories: ProductCategoryEntryMetaItem[];
        brands: ProductBrandEntryMetaItem[];
    };
    bcms: ClientConfig;
}

const ProductsPageWrapper: React.FC<Props> = ({ data, bcms }) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>
                <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                    <Main
                        products={data.products}
                        genders={data.genders}
                        categories={data.categories}
                        brands={data.brands}
                        bcms={bcms}
                    />
                </div>
            </InnerPageWrapper>
        </ContextWrapper>
    );
};

export default ProductsPageWrapper;
