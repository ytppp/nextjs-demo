import "./global.scss";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Layout, ILayoutProps } from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { LOCALDOMAIN, getIsMobile, getIsSupportWebp } from "@/utils";
import { ThemeContextProvider } from "@/stores/theme";
import { UserAgentProvider } from "@/stores/userAgent";

export interface IComponentProps {
  isMobile?: boolean;
  isSupportWebp?: boolean;
}

const MyApp = (data: AppProps & ILayoutProps & {isMobile: boolean; isSupportWebp: boolean}) => {
  const { Component, pageProps, navbarData, footerData, isMobile, isSupportWebp } = data;

  return (
    <div>
      <Head>
        <title>{`A Demo for 《深入浅出SSR官网开发指南》(${
          isMobile ? "移动端" : "pc端"
        })`}</title>
        <meta
          name="description"
          content={`A Demo for 《深入浅出SSR官网开发指南》(${
            isMobile ? "移动端" : "pc端"
          })`}
        />
        {/* 禁用缩放 */}
        <meta name="viewport" content="user-scalable=no" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContextProvider>
        <UserAgentProvider>
          <Layout navbarData={navbarData} footerData={footerData}>
            <Component
              {...pageProps}
              isMobile={isMobile}
              isSupportWebp={isSupportWebp}
            />
          </Layout>
        </UserAgentProvider>
      </ThemeContextProvider>
    </div>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);

  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);

  return {
    ...pageProps,
    ...data,
    isMobile: getIsMobile(context),
    isSupportWebp: getIsSupportWebp(context)
  };
};


export default MyApp;