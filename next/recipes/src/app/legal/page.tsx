import ContentManager from '@/components/ContentManager';
import { LegalPageEntry } from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { bcmsPrivate } from '@/bcms-private';

const updatedDate = (val: number) => {
    const date = new Date(val);

    const day = date.getDate();
    const month = date.toLocaleString('default', {
        month: 'long',
    });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = `Legal - Flavour Fushion`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const LegalPage: React.FC = async () => {
    const legalPageEntries = (await bcmsPrivate.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    return (
        <div className="pt-24 pb-10 lg:pt-[104px] lg:pb-20 xl:pb-[120px]">
            <div className="container">
                <div className="grid grid-cols-1 gap-6 lg:gap-12">
                    {legalPageEntries.map((item, index) => (
                        <div
                            key={index}
                            className="border border-[#E6E6E6] rounded-[10px] px-4 py-6 lg:rounded-2xl lg:px-8 lg:py-10"
                        >
                            <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-2 lg:text-[40px] lg:leading-none lg:mb-5">
                                {item.meta.en?.title}
                            </h2>
                            <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-4 lg:text-base lg:leading-none lg:mb-6">
                                Last updated: {updatedDate(item.updatedAt)}
                            </div>
                            <ContentManager
                                items={item.content.en || []}
                                className="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
