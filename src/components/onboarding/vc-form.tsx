import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { ContactPersonForm } from './contact-person-form';

function VCForm() {
  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col mt-4 space-y-4">
      <Label htmlFor="name">Name *</Label>
      <Input
        id="name"
        placeholder="Fund Name"
        {...register('name', { required: true })}
      />
      {formState.errors.name && (
        <p className="mt-1 text-sm text-red-500">Fund name is required.</p>
      )}

      <Label htmlFor="fundWebsiteUrl">Fund Website URL</Label>
      <Input
        id="fundWebsiteUrl"
        placeholder="https://"
        {...register('fundWebsiteUrl')}
      />

      <RadioGroup
        defaultValue="ventureCapital"
        {...register('fundType', { required: true })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ventureCapital" id="ventureCapital" />
          <Label htmlFor="ventureCapital">Venture Capital</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="privateEquity" id="privateEquity" />
          <Label htmlFor="privateEquity">Private Equity</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both" />
          <Label htmlFor="both">Both</Label>
        </div>
      </RadioGroup>
      {formState.errors.fundType && (
        <p className="mt-1 text-sm text-red-500">
          Selecting the type of fund is required.
        </p>
      )}

      <div className="flex flex-col p-4 space-y-4 border">
        <Label htmlFor="contactPerson">Contact Person</Label>
        <ContactPersonForm name="contactPerson" />
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
            Data Privacy Policy*
          </a>
          .
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

export default VCForm;
