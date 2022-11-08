import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';
import PageRoot from '../components/layouts/PageRoot';

const Index = () => {
  const { t } = useTranslation(['intro', 'menu']);

  return (
    <PageRoot title="Main" desc="Main Page">
      <div className="main-intro">
        <h1>Welcome to NextPlat!</h1>
        <p>{t('introduce-desc-1')}</p>
        <p>{t('introduce-desc-2')}</p>
        <a href="https://github.com/jooy2/nextplat">{t('menu:go-to-github')}</a>
      </div>
    </PageRoot>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'intro', 'menu'])),
  },
});

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps)(Index);
