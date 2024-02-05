import type { AppProps } from 'next/app';

declare module 'next/app' {
  export interface AuthAppProps extends AppProps {
    Component: { auth?: boolean } & AppProps['Component'];
  }

  export type Nullable<T> = T | null;
}
