
import AuthLayout from '@/layouts/auth-layout';
import { Assets } from '@/utils/assets';

export default function VerifyPage() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col justify-center mx-auto space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <img
            src={Assets.VerifyEmailAnimation}
            alt="Verify Email Animation"
            className="mx-auto"
          />
          <h1 className="text-3xl font-semibold tracking-tight">
            Verify your email
          </h1>
          <p className="text-md text-muted-foreground">
            We have sent you an email with a link to verify your account. Plese
            check your inbox and click on the link to verify your account.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
