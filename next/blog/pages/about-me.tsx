import {TopGradient} from "~/components/TopGradient";
import {ContentManager} from "~/components/ContentManager";
import {BCMSImage} from "~/bcms-components";
import {PageWrapper} from "~/components/PageWrapper";
import {GetServerSideProps} from "next";
import {AboutPageData, APIResponse} from "~/types";
import {AboutApi} from "~/api";
import {useHeadTags} from "~/composables/og-head";
import {useEffect} from "react";

export default function AboutMe ({data, footer, header}: APIResponse<AboutPageData>): JSX.Element {
    const {setOgHead} = useHeadTags()
    useEffect(() => {
        setOgHead({
            title: data?.meta?.title,
        });
    }, [data]);
    return (
        <PageWrapper header={header} footer={footer}>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
                <div className="container">
                    <div className="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]">
                        <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                            {data.meta.subtitle}
                        </div>
                        <h1 className="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6">
                            {data.meta.title}
                        </h1>
                        <ContentManager
                            item={data.meta.description}
                            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
                        />
                    </div>
                    <div className="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8">
                        <BCMSImage media={data.meta.cover} className="w-full h-full cover" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
                    </div>
                    <ContentManager item={data.content} className="prose" />
                </div>
                <TopGradient />
            </div>
        </PageWrapper>
    );
}


export const getServerSideProps: GetServerSideProps<APIResponse<AboutPageData>> = async () => {
    const aboutApi = new AboutApi()
    const data = await aboutApi.getAboutPageData()
    return {
        props: {
            ...data
        }
    }
}
