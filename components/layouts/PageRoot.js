import React, { useMemo } from 'react';

import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Header from './Header';
import Footer from './Footer';
import useRouterScroll from '../../utils/useRouterScroll';
import { getNextEnv } from '../../utils/helper';

const PageRoot = ({
  title = null,
  desc = null,
  header = true,
  container = true,
  footer = true,
  headerTitle = '',
  withTail = true,
  scrollToTop = true,
  noIndex = false,
  openGraph = {},
  children,
}) => {
  const { t } = useTranslation(['common']);
  const currentTitle = useMemo(() => `${title || t('site-title')}${withTail ? headerTitle || t('site-title-tail') : ''}`, [title, desc]);

  useRouterScroll({ behavior: 'auto', scroll: scrollToTop });

  return (
    <div className="layout-page-root-wrapper">
      <NextSeo
        title={currentTitle}
        openGraph={openGraph || {
          title: currentTitle,
          description: desc,
          type: 'website',
          url: getNextEnv('BASE_URL'),
          images: [
            {
              url: `${getNextEnv('BASE_URL')}/images/open-graph-default.png`,
              width: 700,
              height: 250,
              alt: 'Site Logo',
            },
          ],
          site_name: t('site-title'),
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        canonical={getNextEnv('BASE_URL')}
        description={desc}
        additionalMetaTags={[{
          name: 'keywords',
          content: t('default-keywords'),
        }, {
          name: 'author',
          content: getNextEnv('SITE_AUTHOR'),
        }]}
        noindex={noIndex}
        nofollow={noIndex}
      />
      <Head>
        <title key="title">
          {currentTitle}
        </title>
        <link
          rel="alternate"
          hrefLang="x-default"
          href={getNextEnv('BASE_URL')}
        />
      </Head>
      {header
        ? (
          <Header
            title={headerTitle || title || t('site-title')}
            container={container}
          />
        )
        : null}
      <main className={container ? 'layout-page-main-container' : ''}>
        {children}
      </main>
      {footer
        ? (
          <Footer />
        )
        : null}
    </div>
  );
};

export default PageRoot;
