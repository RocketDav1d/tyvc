import Head from 'next/head';
import { useTranslation } from 'next-i18next';

type PageHeadProps = {
  title: string;
};

function PageHead({ title }: PageHeadProps) {
  const { t } = useTranslation('common');

  return (
    <Head>
      <title>{`${t('title')} | ${title}`}</title>
      <meta name="description" content="TYVC" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default PageHead;
