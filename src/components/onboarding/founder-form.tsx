import React from 'react';

import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import CompanyForm from '@/components/onboarding/company-form';
import { DiversitySelectorSimple } from '@/components/onboarding/diversity-selector';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FounderForm = React.forwardRef((ref) => {
  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col mt-4 space-y-4">
      <Label htmlFor="firstName">First Name *</Label>
      <Input
        id="firstName"
        placeholder="Name"
        {...register('firstName', { required: true })}
      />
      {formState.errors.firstName && (
        <p className="mt-1 text-sm text-red-500">First name is required.</p>
      )}

      <Label htmlFor="lastName">Last Name *</Label>
      <Input
        id="lastName"
        placeholder="Last"
        {...register('lastName', { required: true })}
      />
      {formState.errors.lastName && (
        <p className="mt-1 text-sm text-red-500">Last name is required.</p>
      )}

      <Label htmlFor="linkedinProfile">LinkedIn Profile*</Label>
      <Input
        id="linkedinProfile"
        placeholder="https://linkedin.com/in/your-profile"
        {...register('linkedinProfile', { required: true })}
      />
      {formState.errors.linkedinProfile && (
        <p className="mt-1 text-sm text-red-500">
          LinkedIn profile URL is required.
        </p>
      )}

      <DiversitySelectorSimple name="diversity" />

      <div className="flex items-center">
        <Checkbox {...register('serialFounder')} className="rounded" />
        <Label htmlFor="serialFounder" className="ml-2">
          Are you a serial founder?
        </Label>
      </div>

      <div className="flex flex-col space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Past Companies:
        </Label>
        <CompanyForm name="pastCompanies" />
      </div>

      <div className="flex flex-col space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Current Companies:
        </Label>
        <CompanyForm name="companies" showAdditionalProof showUrl />
      </div>

      <div className="flex items-center">
        <Checkbox
          {...register('acceptPrivacy', { required: true })}
          className="rounded"
          required
        />
        <Label htmlFor="acceptPrivacy" className="ml-2">
          I accept the{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          *
        </Label>
      </div>
      {formState.errors.acceptPrivacy && (
        <p className="mt-1 text-sm text-red-500">
          You must accept the privacy policy.
        </p>
      )}

      <div className="flex items-center">
        <Checkbox
          {...register('acceptTerms', { required: true })}
          className="rounded"
          required
        />
        <Label htmlFor="acceptTerms" className="ml-2">
          I accept the{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms and Conditions
          </Link>
          *
        </Label>
      </div>
      {formState.errors.acceptTerms && (
        <p className="mt-1 text-sm text-red-500">
          You must accept the terms and conditions.
        </p>
      )}

      <div className="flex items-center">
        <Checkbox
          {...register('acceptCommunityGuidelines', { required: true })}
          className="rounded"
          required
        />
        <Label htmlFor="acceptCommunityGuidelines" className="ml-2">
          I accept the{' '}
          <a
            href="/community-guidelines"
            className="text-blue-600 hover:underline"
          >
            Community Guidelines
          </a>
          *
        </Label>
      </div>
      {formState.errors.acceptCommunityGuidelines && (
        <p className="mt-1 text-sm text-red-500">
          You must accept the community guidelines.
        </p>
      )}
    </div>
  );
});

FounderForm.displayName = 'FounderForm';

export default FounderForm;
