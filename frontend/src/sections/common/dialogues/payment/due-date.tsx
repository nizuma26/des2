import { useFormContext, useWatch } from 'react-hook-form';

import { calculateDueDate } from '../../../../utils/calculate-due-date';
import ControlledDatePicker from '../../../../components/controlled/controlled-datepicker';

const DueDate = () => {
  const { control, setValue } = useFormContext();

  const credit_days = useWatch({
    control: control,
    name: 'credit_days',
  });

  const date = calculateDueDate(credit_days);

  setValue('due_date', date);

  return (
    <ControlledDatePicker
      name="due_date"
      label="Fecha límite"
      control={control}
      size="small"
      disabled
    />
  );
};

export default DueDate;
