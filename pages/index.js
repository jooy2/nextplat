import React from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>{t('hello')}</p>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const mapStateToProps = state => ({
  common: state.common,
});

export default connect(mapStateToProps)(Index);
