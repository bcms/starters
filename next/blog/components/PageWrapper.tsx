
import {Header} from './layout/Header';
import {Footer} from './layout/Footer';
import { HeaderEntryMeta, FooterEntryMeta } from '~~/bcms/types';
import React, {PropsWithChildren} from "react";

interface PageWrapperI {
    header: HeaderEntryMeta;
    footer: FooterEntryMeta;
}
export const PageWrapper: React.FC<PropsWithChildren<PageWrapperI>> = ({header, children, footer}) => {
    return (
        <div className="overflow-hidden">
            <Header data={header} />
            <main>{children}</main>
            <Footer data={footer} />
        </div>
    )
}
