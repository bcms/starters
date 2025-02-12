import type { ClientConfig } from '@thebcms/client';
import { useEffect, type PropsWithChildren } from 'react';
import { useCart } from '../context/CartContext';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

interface WrapperProps {
    bcms: ClientConfig;
}

const InnerPageWrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
    bcms,
    children,
}) => {
    const { setBcms } = useCart();

    // Set BCMS configuration
    useEffect(() => {
        setBcms(bcms);
    }, [bcms]);

    return (
        <div className="overflow-hidden flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default InnerPageWrapper;
