import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FounderForm() {
  const { watch, register, formState } = useFormContext();

  return (
    <div className="flex flex-col mt-4 space-y-4">
      <Label htmlFor="firstName">Name *</Label>
      <Input
        id="firstName"
        placeholder="Name"
        {...register('firstName', { required: true })}
      />
      {formState.errors.firstName && (
        <p className="mt-1 text-sm text-red-500">Name is required.</p>
      )}

      <Label htmlFor="lastName">Last Name *</Label>
      <Input
        id="lastName"
        placeholder="Last Name"
        {...register('lastName', { required: true })}
      />
      {formState.errors.lastName && (
        <p className="mt-1 text-sm text-red-500">Last name is required.</p>
      )}

      <Label htmlFor="numberInvestments">Number Investments *</Label>
      <div className="flex items-center">
        <Input
          type="range"
          id="numberInvestments"
          min="1"
          max="50"
          className="bg-black"
          {...register('numberInvestments', {
            required: true,
            value: 1,
          })}
        />
        <span className="ml-2 text-sm">{watch('numberInvestments', 1)}</span>
      </div>
      {formState.errors.numberInvestments && (
        <p className="mt-1 text-sm text-red-500">
          Number of investments is required.
        </p>
      )}

      <Label htmlFor="email">E-Mail</Label>
      <Input id="email" placeholder="Email" {...register('email')} />

      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        placeholder="Phone Number"
        {...register('phoneNumber')}
      />

      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
      <Input
        id="linkedinUrl"
        placeholder="https://linkedin.com/in/your-profile"
        {...register('linkedinUrl')}
      />

      <Label htmlFor="website">Website</Label>
      <Input
        id="website"
        placeholder="https://yourwebsite.com"
        {...register('website')}
      />

      <div className="flex items-center">
        <Checkbox
          {...register('acceptPrivacy', { required: true })}
          className="rounded"
          required
        />
        <Label htmlFor="acceptPrivacy" className="ml-2">
          I accept the{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Data Privacy Policy
          </a>
          *
        </Label>
      </div>
      {formState.errors.acceptPrivacy && (
        <p className="mt-1 text-sm text-red-500">
          You must accept the data privacy policy.
        </p>
      )}
    </div>
  );
}

export default FounderForm;
