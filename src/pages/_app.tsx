import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';

import { ThemeProvider } from '@/contexts/theme-provider';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth(props: React.PropsWithChildren<{}>) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>...</div>;
  }

  return <>{props.children}</>;
}

export default appWithTranslation(MyApp);
