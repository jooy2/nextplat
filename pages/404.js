import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => (
  <div>
    <h1>404</h1>
  </div>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Index;
