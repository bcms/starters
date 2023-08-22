import React, { useEffect } from 'react';
import {GetStaticProps} from 'next';
import { APIResponse, HomePageData } from '~~/types';
import { useHeadTags } from '~/composables/og-head';
import {PageWrapper} from "~/components/PageWrapper";
import { HomeApi} from "~/api";
import {HomepageHero} from "~/components/home-page/Hero";
import {HomePageBlogsList} from "~/components/home-page/BlogList";

const HomePage: React.FC<APIResponse<HomePageData>> =  (props) =>  {
  const { setOgHead } = useHeadTags();
  useEffect(() => {
    setOgHead({
      title: props.data?.meta?.title,
    });
  }, [props.data]);

  return (
      <PageWrapper header={props.header} footer={props.footer}>
        {props.data !== null  && (
           <>
             <HomepageHero data={props.data.meta.hero} />
             <HomePageBlogsList blogs={props.data.blogs} />
           </>
        )}
      </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps<APIResponse<HomePageData>> = async () => {
  const homeAPiClient = new HomeApi()
  const data = await homeAPiClient.getHomePageData()
  return {
    props: {
      ...data
    }
  }
}

export default  HomePage
