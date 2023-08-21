
import {Header} from './layout/Header';
import {Footer} from './layout/Footer';
import { HeaderEntryMeta, FooterEntryMeta } from '~~/bcms/types';
import {PropsWithChildren} from "react";

interface PageWrapperI {
    header: HeaderEntryMeta;
    footer: FooterEntryMeta;
}
export function PageWrapper ({header, children, footer}: PropsWithChildren<PageWrapperI>): JSX.Element {
    return (
        <div className="overflow-hidden">
            <Header data={header} />
            <main>{children}</main>
            <Footer data={footer} />
        </div>
    )
}
