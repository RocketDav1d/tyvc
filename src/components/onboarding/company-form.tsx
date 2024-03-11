import React from 'react';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';

import FileDropzone from '@/components/file-dropzone';
import { DiversitySelector } from '@/components/onboarding/diversity-selector';
import FounderPositionSelector from '@/components/onboarding/founder-position-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


type CompanyFormProps = {
  name: string;
  showUrl?: boolean;
  showAdditionalProof?: boolean;
};

const CompanyForm = ({
  name,
  showUrl,
  showAdditionalProof,
}: CompanyFormProps) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="p-4 border rounded border-gray-200">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col py-4 space-y-4 ${index !== fields.length - 1 ? 'border-b' : ''}`}
        >
          <Label htmlFor={`name-${index}`}>{`Company #${index + 1}`}</Label>
          <Input {...register(`${name}[${index}].name`)} />

          <Label>Logo</Label>
          <Controller
            control={control}
            name={`${name}[${index}].logo`}
            render={({ field: { onChange, ref } }) => (
              <FileDropzone
                onUpload={(files) => onChange(files)}
                acceptedFormats={{
                  'image/*': ['.jpeg', '.jpg', '.png'],
                }}
                supportedFormatsLabel="JPEG, JPG, PNG"
                ref={ref}
              />
            )}
          />

          <DiversitySelector name={`${name}[${index}].diversity`} />

          <Label htmlFor={`register-${index}`}>Register</Label>
          <Input {...register(`${name}[${index}].register`)} />

          <Label htmlFor={`registerNumber-${index}`}>Register Number</Label>
          <Input {...register(`${name}[${index}].registerNumber`)} />

          <FounderPositionSelector name={`${name}[${index}].position`} />

          {showUrl && (
            <>
              <Label htmlFor={`url-${index}`}>URL</Label>
              <Input {...register(`${name}[${index}].url`)} />
            </>
          )}

          {showAdditionalProof && (
            <>
              <Label>Additional Proof</Label>
              <Controller
                control={control}
                name={`${name}[${index}].additionalProof`}
                render={({ field: { onChange, ref } }) => (
                  <FileDropzone
                    onUpload={(files) => onChange(files)}
                    acceptedFormats={{
                      'application/pdf': ['.pdf'],
                    }}
                    supportedFormatsLabel="PDF"
                    ref={ref}
                  />
                )}
              />
            </>
          )}

          <Button
            type="button"
            variant={'outline'}
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({})}>
        Add company
      </Button>
    </div>
  );
};

export default CompanyForm;
