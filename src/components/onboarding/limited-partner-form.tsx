import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { ContactPersonForm } from './contact-person-form';

function LimitedPartnerForm() {
  const { watch, register, formState } = useFormContext();

  return (
    <Tabs
      defaultValue="privatePerson"
      aria-label="Limited Partner Type"
      className="w-full mb-4"
    >
      <TabsList className="w-full">
        <TabsTrigger value="privatePerson" className="w-full">
          Private Person
        </TabsTrigger>
        <TabsTrigger value="organization" className="w-full">
          Organization
        </TabsTrigger>
      </TabsList>
      <TabsContent value="privatePerson" className="w-full">
        <div className="flex flex-col my-4 space-y-4">
          <Label htmlFor="name" className="w-full">
            Name *
          </Label>
          <Input
            id="name"
            placeholder="Your Name"
            {...register('name', { required: true })}
          />
          {formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">Name is required.</p>
          )}

          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Your Last Name"
            {...register('lastName', { required: true })}
          />
          {formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-500">Last name is required.</p>
          )}

          <Label htmlFor="numberFundInvestments">
            Number of Fund Investments *
          </Label>
          <div className="flex items-center">
            <Input
              type="range"
              id="numberFundInvestments"
              {...register('numberFundInvestments', { required: true })}
            />
            <span className="ml-2 text-sm">
              {watch('numberFundInvestments', 1)}
            </span>
          </div>
          {formState.errors.numberFundInvestments && (
            <p className="mt-1 text-sm text-red-500">This field is required.</p>
          )}

          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            placeholder="Your E-Mail"
            {...register('email', { required: true })}
          />
          {formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">E-Mail is required.</p>
          )}

          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            placeholder="Your Phone Number"
            {...register('phoneNumber', { required: true })}
          />
          {formState.errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              Phone number is required.
            </p>
          )}

          <div className="flex items-center">
            <Checkbox {...register('isHoldingVehicle')} className="rounded" />
            <Label htmlFor="isHoldingVehicle" className="ml-2">
              Is Holding Vehicle?
            </Label>
          </div>

          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            placeholder="https://linkedin.com/in/your-profile"
            {...register('linkedinUrl')}
          />
          {formState.errors.linkedinUrl && (
            <p className="mt-1 text-sm text-red-500">
              LinkedIn URL is required.
            </p>
          )}

          <div className="flex items-center">
            <Checkbox
              {...register('acceptPrivacy', { required: true })}
              className="rounded"
              required
            />
            <Label htmlFor="acceptPrivacy" className="ml-2">
              I accept the Data Privacy Policy *
            </Label>
          </div>
          {formState.errors.acceptPrivacy && (
            <p className="mt-1 text-sm text-red-500">
              You must accept the data privacy policy.
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="organization">
        <div className="flex flex-col space-y-4">
          <Label htmlFor="orgName">Name *</Label>
          <Input
            id="orgName"
            placeholder="Organization Name"
            {...register('orgName', { required: true })}
          />
          {formState.errors.orgName && (
            <p className="mt-1 text-sm text-red-500">
              Organization name is required.
            </p>
          )}

          <Label htmlFor="numberFundInvestments">Number Investments *</Label>
          <div className="flex items-center">
            <Input
              type="range"
              id="numberFundInvestments"
              min="1"
              max="50"
              className="bg-black"
              {...register('numberFundInvestments', {
                required: true,
                value: 1,
              })}
            />
            <span className="ml-2 text-sm">
              {watch('numberFundInvestments', 1)}
            </span>
          </div>
          {formState.errors.numberFundInvestments && (
            <p className="mt-1 text-sm text-red-500">
              Number of investments is required.
            </p>
          )}
          <Label htmlFor="fundWebsiteUrl">Fund Website URL</Label>
          <Input
            id="fundWebsiteUrl"
            placeholder="https://"
            {...register('fundWebsiteUrl')}
          />
          {formState.errors.fundWebsiteUrl && (
            <p className="mt-1 text-sm text-red-500">
              Fund website URL is required.
            </p>
          )}

          <div className="flex flex-col space-y-4">
            <Label className="block text-sm font-medium text-gray-700">
              Type of Fund:
            </Label>
            <div className="flex items-center space-x-4">
              <input
                {...register('fundType', { required: true })}
                type="radio"
                value="ventureCapital"
                id="ventureCapital"
              />
              <Label htmlFor="ventureCapital">Venture Capital</Label>

              <input
                {...register('fundType', { required: true })}
                type="radio"
                value="privateEquity"
                id="privateEquity"
              />
              <Label htmlFor="privateEquity">Private Equity</Label>

              <input
                {...register('fundType', { required: true })}
                type="radio"
                value="both"
                id="both"
              />
              <Label htmlFor="both">Both</Label>
            </div>
            {formState.errors.fundType && (
              <p className="mt-1 text-sm text-red-500">
                Selecting the type of fund is required.
              </p>
            )}
          </div>

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
              I accept the Data Privacy Policy *
            </Label>
          </div>
          {formState.errors.acceptPrivacy && (
            <p className="mt-1 text-sm text-red-500">
              You must accept the data privacy policy.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default LimitedPartnerForm;
