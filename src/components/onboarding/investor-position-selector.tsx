import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type InvestorPositionSelectorProps = {
  name: string;
};

const InvestorPositionSelector = ({ name }: InvestorPositionSelectorProps) => {
  const { control, register, formState } = useFormContext();

  return (
    <div>
      <Label htmlFor="position">Position</Label>
      <Select {...register(name)}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="own">
            <span className="font-medium">Own</span>
          </SelectItem>
          <SelectItem value="investment-team">
            <span className="font-medium">Investment Team</span>
          </SelectItem>
          <SelectItem value="administration">
            <span className="font-medium">Administration</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvestorPositionSelector;
