import type { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultSeo } from 'next-seo';
import { ThemeProvider, useTheme } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import '@fontsource/inter/variable-full.css';
import '@fontsource/noto-sans-tc';
import '$styles/default.css';
import ApplicationLayout from '$components/layouts/default';
import seoConfig from '$lib/seo-config';

function SeoComponent() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <DefaultSeo {...seoConfig} themeColor={resolvedTheme === 'dark' ? '#171717' : '#F5F5F5'} />
      <NextNProgress
        color={resolvedTheme === 'dark' ? '#464646' : '#adadad'}
        height={2}
        showOnShallow={false}
        options={{ showSpinner: false }}
      />
    </>
  );
}

function NextApplcation({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ThemeProvider enableSystem attribute="data-theme">
        <SeoComponent />
        <ApplicationLayout>
          <Component {...pageProps} />
        </ApplicationLayout>
      </ThemeProvider>
    </>
  );
}

export default NextApplcation;
