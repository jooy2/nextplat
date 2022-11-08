import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageRoot from '../components/layouts/PageRoot';

const Index = () => (
  <PageRoot title="404: Page Not Found" desc="404 Page Not Found">
    <h1>No page found for the requested URL.</h1>
    <p>Please make sure it is a valid URL and try again.</p>
  </PageRoot>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Index;
