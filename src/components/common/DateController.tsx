import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import {
  LocalizationProvider,
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type DateTimeControllerProps = DateTimePickerProps<Dayjs> & {
  rules?: ControllerProps["rules"];
  shouldUnregister?: ControllerProps["shouldUnregister"];
  name: string;
  options?: { label: string; value: string }[];
};

const DateTimeController: React.FC<DateTimeControllerProps> = ({
  name,
  defaultValue,
  shouldUnregister,
  rules,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={dayjs(defaultValue)}
      name={name}
      render={({ field: { ref, ...fields } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            {...fields}
            inputRef={ref}
            label={fields.name}
            format="DD/MM/YYYY HH:mm"
            value={dayjs(new Date(fields.value))}
            onChange={(date) => {
              fields.onChange(date ? new Date(date.valueOf()) : null);
            }}
            slotProps={{ textField: { variant: "standard" } }}
            {...props}
          />
        </LocalizationProvider>
      )}
      rules={{ ...rules }}
      shouldUnregister={shouldUnregister}
    />
  );
};

export default DateTimeController;
