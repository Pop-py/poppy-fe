'use client';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar } from './calendar';

type Props = {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

const DatePicker = (props: Props) => {
  const { selectedDate, onSelect } = props;
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelect}
      disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
      classNames={{
        day_today: 'text-gray-800',
        day_selected: 'bg-blue-500 text-white rounded-xl',
      }}
      locale={ko}
      formatters={{
        formatCaption: date => format(date, 'yyyy.MM'),
      }}
    />
  );
};

export { DatePicker };
