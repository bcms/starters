import ContextWrapper from '../../ContextWrapper';
import InnerPageWrapper from '../../InnnerPageWrapper';
import type { ClientConfig } from '@thebcms/client';
import { Main } from './Main';
import type { ProductLite } from '../../../utils/product';
import type { ProductEntryMetaItem } from '../../../../bcms/types/ts';

interface Props {
    data: {
        meta: ProductEntryMetaItem;
        otherProducts: ProductLite[];
    };
    bcms: ClientConfig;
}

const ProductPageWrapper: React.FC<Props> = ({ data, bcms }) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>
                <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                    <Main
                        meta={data.meta}
                        otherProducts={data.otherProducts}
                        bcms={bcms}
                    />
                </div>
            </InnerPageWrapper>
        </ContextWrapper>
    );
};

export default ProductPageWrapper;
