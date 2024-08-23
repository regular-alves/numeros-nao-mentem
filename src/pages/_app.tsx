import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '@naoMentem/utils/createEmotionCache';
import lightThemeOptions from '@naoMentem/themes/lightThemeOptions';

import '@naoMentem/styles/globals.css'
import Head from 'next/head';
import Header from '@naoMentem/molecules/Header';
import Footer from '@naoMentem/molecules/Footer';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;