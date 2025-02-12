import type { PropsWithChildren } from 'react';
import ContextWrapper from '../ContextWrapper';
import InnerPageWrapper from '../InnnerPageWrapper';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    bcms: ClientConfig;
}

const BlogPagesWrapper: React.FC<PropsWithChildren<Props>> = ({
    children,
    bcms,
}) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>{children}</InnerPageWrapper>
        </ContextWrapper>
    );
};

export default BlogPagesWrapper;
