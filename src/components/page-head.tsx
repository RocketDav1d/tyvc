import Head from 'next/head';

type PageHeadProps = {
  title: string;
};

function PageHead({ title }: PageHeadProps) {
  return (
    <Head>
      <title>{`${title} | TYVC`}</title>
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
