import React, { forwardRef } from 'react';

import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DiversitySelectorProps = {
  name: string;
};

const DiversitySelectorSimple = forwardRef(
  ({ name }: DiversitySelectorProps, ref) => {
    const { register } = useFormContext();

    return (
      <div>
        <Label htmlFor="diversity">Diversity</Label>
        <Select {...register(name)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="white-male">
              <span className="font-medium">White male</span>
            </SelectItem>
            <SelectItem value="white-female">
              <span className="font-medium">White female</span>
            </SelectItem>
            <SelectItem value="person-of-color-male">
              <span className="font-medium">Person of Color male</span>
            </SelectItem>
            <SelectItem value="person-of-color-female">
              <span className="font-medium">Person of Color female</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

DiversitySelectorSimple.displayName = 'DiversitySelectorSimple';

const DiversitySelector = forwardRef(
  ({ name }: DiversitySelectorProps, ref) => {
    const { register, formState } = useFormContext();

    return (
      <div className="flex flex-col space-y-2">
        <Label htmlFor="diversity">Diversity*</Label>
        <Select {...register(name)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="only-white-male-founders">
              <span className="font-medium">Only white male Founders</span>
            </SelectItem>
            <SelectItem value="only-white-female-founders">
              <span className="font-medium">Only white female Founders</span>
            </SelectItem>
            <SelectItem value="only-person-of-color-male-founders">
              <span className="font-medium">
                Only Person of Color male Founders
              </span>
            </SelectItem>
            <SelectItem value="only-person-of-color-female-founders">
              <span className="font-medium">
                Only Person of Color female Founders
              </span>
            </SelectItem>
            <SelectItem value="min-one-woman">
              <span className="font-medium">Min 1 woman</span>
            </SelectItem>
            <SelectItem value="min-one-person-of-color">
              <span className="font-medium">Min 1 Person of Color</span>
            </SelectItem>
            <SelectItem value="min-one-woman-and-one-person-of-color">
              <span className="font-medium">
                Min 1 Woman & Min 1 Person of Color
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

DiversitySelector.displayName = 'DiversitySelector';

export { DiversitySelectorSimple, DiversitySelector };
