import { bcms } from '@/bcms-client';
import 'swiper/css';
import { LegalPageEntry } from '@bcms-types/types/ts';
import { Metadata } from 'next';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = `Legal - Tastyyy`;

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
    const legalEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    return (
        <div>
            <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                <div className="container max-w-[1198px]">
                    <ArchWithStar />
                    <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[850px] xl:px-0">
                        <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-12 lg:text-5xl lg:leading-none lg:mb-20">
                            Legal
                        </h1>
                        <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
                            {legalEntries.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-[#DBD9D5] rounded-[7px] p-6"
                                >
                                    <h2 className="leading-none tracking-[-0.41px] font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-5">
                                        {item.meta.en?.title}
                                    </h2>
                                    <ContentManager
                                        items={item.content.en || []}
                                        className="text-sm leading-normal tracking-[-0.41px] text-appGray-200 lg:text-lg lg:leading-normal"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegalPage;
