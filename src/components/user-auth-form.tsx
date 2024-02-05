import * as React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';


interface UserAuthFormProps {
  onSubmit?: (data: { email: string }) => Promise<void>;
}

export function UserAuthForm({ onSubmit }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ email: string }>();

  async function onSubmitForm(data: { email: string }) {
    if (onSubmit) {
      await onSubmit(data);
    }
  }

  return (
    <div className={cn('grid gap-6')}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: true })}
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
