import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageRoot from '../components/layouts/PageRoot';

const Error = () => (
  <PageRoot
    title="Page Error"
    desc="An unknown page error has occurred."
  >
    <h1>An unknown page error has occurred.</h1>
    <p>Please contact your website administrator.</p>
  </PageRoot>
);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Error;
