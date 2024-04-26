import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FounderPositionSelectorProps = {
  name: string;
};

const FounderPositionSelector = ({ name }: FounderPositionSelectorProps) => {
  const { control, register, formState } = useFormContext();

  return (
    <div>
      <Label htmlFor="position">Position</Label>
      <Select {...register(name)}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="c-level">
            <span className="font-medium">C-level position</span>
          </SelectItem>
          <SelectItem value="founder">
            <span className="font-medium">Founder</span>
          </SelectItem>
          <SelectItem value="co-founder">
            <span className="font-medium">Co-founder</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FounderPositionSelector;
