import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import InvestorPositionSelector from './investor-position-selector';

type ContactPersonFormProps = {
  name: string;
};

const ContactPersonForm = ({ name }: ContactPersonFormProps) => {
  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor={`${name}.firstName`}>Name*</Label>
      <Input {...register(`${name}.firstName`, { required: true })} />
      {formState.errors[`${name}.name`] && (
        <p className="mt-1 text-sm text-red-500">Name is required.</p>
      )}

      <Label htmlFor={`${name}.lastName`}>Last Name*</Label>
      <Input {...register(`${name}.lastName`, { required: true })} />
      {formState.errors[`${name}.lastName`] && (
        <p className="mt-1 text-sm text-red-500">Last name is required.</p>
      )}

      <Label htmlFor={`${name}.email`}>Email</Label>
      <Input {...register(`${name}.email`)} />

      <Label htmlFor={`${name}.phoneNumber`}>Phone Number</Label>
      <Input {...register(`${name}.phoneNumber`)} />

      <Label htmlFor={`${name}.linkedinUrl`}>LinkedIn URL</Label>
      <Input {...register(`${name}.linkedinUrl`)} />

      <InvestorPositionSelector name={`${name}.position`} />
    </div>
  );
};

export { ContactPersonForm };
