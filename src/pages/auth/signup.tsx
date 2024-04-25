import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { UserAuthForm } from '@/components/user-auth-form';
import AuthLayout from '@/layouts/auth-layout';

export default function SigninPage() {
  async function onSignin(data: { email: string }) {
    await signIn('email', { email: data.email });
  }

  return (
    <AuthLayout>
      <div className="w-full flex flex-col justify-center mx-auto space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
          <p className="text-md text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm onSubmit={onSignin} />
        <p className="px-8 text-sm text-center text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="https://trustyourvc.com/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="https://trustyourvc.com/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthLayout>
  );
}
