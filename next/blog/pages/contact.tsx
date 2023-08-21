import {TopGradient} from "~/components/TopGradient";
import {PageWrapper} from "~/components/PageWrapper";
import { APIResponse, ContactPageData} from "~/types";
import {GetServerSideProps} from "next";
import { ContactApi} from "~/api";
import {ContactPageForm} from "~/components/content-page/Form";
import {useEffect} from "react";
import {useHeadTags} from '~/composables/og-head'
export default function ContactPage({data, header, footer}: APIResponse<ContactPageData>): JSX.Element {
    const {setOgHead} = useHeadTags()
    useEffect(() => {
        setOgHead({
            title: data?.meta?.title,
        });
    }, [data]);

    if (!data) {
        return <></>
    }

    return (
        <PageWrapper header={header} footer={footer}>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
                <div className="container">
                    <div
                        className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
                    >
                        <h1
                            className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
                        >
                            {data.meta.title}
                        </h1>
                        <h2
                            className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
                        >
                            {data.meta.subtitle}
                        </h2>
                    </div>
                </div>
                <TopGradient/>
            </div>
            <ContactPageForm email={data.meta.email}/>
        </PageWrapper>
    )
}


export const getServerSideProps: GetServerSideProps<APIResponse<ContactPageData>> = async () => {
    const contactApi = new ContactApi()
    const data = await contactApi.getContactPage()
    return {
        props: {
            ...data
        }
    }
}
