import ContextWrapper from '../../ContextWrapper';
import InnerPageWrapper from '../../InnnerPageWrapper';
import type { ClientConfig } from '@thebcms/client';
import { Main } from './Main';

interface Props {
    bcms: ClientConfig;
}

const CartPageWrapper: React.FC<Props> = ({ bcms }) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>
                <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                    <Main bcms={bcms} />
                </div>
            </InnerPageWrapper>
        </ContextWrapper>
    );
};

export default CartPageWrapper;
