import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Error = () => (
  <div>
    <h1>404</h1>
  </div>
);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Error;
