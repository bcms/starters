import ContextWrapper from '../ContextWrapper';
import InnerPageWrapper from '../InnnerPageWrapper';
import type { LegalEntry } from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';

interface Props {
    entries: LegalEntry[];
    bcms: ClientConfig;
}

const LegalPageWrapper: React.FC<Props> = ({ entries, bcms }) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>
                <div>
                    <h1 className="sr-only">Legal page</h1>
                    <div className="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
                        <div className="container">
                            <div className="grid grid-cols-1 gap-6">
                                {entries.map((entry, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border border-[#DBD9D5] p-6"
                                        >
                                            <h2 className="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]">
                                                {entry.meta.en?.title}
                                            </h2>
                                            {entry.content.en && (
                                                <ContentManager
                                                    items={entry.content.en}
                                                    className="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </InnerPageWrapper>
        </ContextWrapper>
    );
};

export default LegalPageWrapper;
