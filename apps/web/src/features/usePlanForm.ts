import { useState } from 'react';
import { FormData, Select, Selectable } from '../shared/lib/types';

export const usePlanForm = () => {
  const [formData, setFormData] = useState<FormData>({
    date: undefined,
    time: '',
    visitors: 0,
  });
  const [selectable, setSelectable] = useState<Selectable>({
    time: false,
    visitors: false,
    book: false,
  });
  const onSelect: Select = {
    date: (date: Date | undefined) => {
      if (!date) return;
      setFormData({ ...formData, date: date });
      setSelectable({ ...selectable, time: true, visitors: true });
    },
    time: (time: string) => setFormData({ ...formData, time }),
    visitors: (visitors: number) => setFormData({ ...formData, visitors }),
  };

  return {
    formData,
    onSelect,
    selectable,
  };
};
