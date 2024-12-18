import Header from './layout/Header';
import Footer from './layout/Footer';
import type { PropsWithChildren } from 'react';
import type { LegalEntry } from '../../bcms/types/ts';

interface Props {
    legal: LegalEntry[];
}

const PageWrapper: React.FC<PropsWithChildren<Props>> = ({
    children,
    legal,
}) => {
    return (
        <div className="overflow-hidden flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col flex-1">{children}</div>
            <Footer legal={legal} />
        </div>
    );
};

export default PageWrapper;
