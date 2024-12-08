'use client';
import { usePlanForm } from '@/src/features/usePlanForm';
import { BookSheet } from '@/src/shared/ui/sheet';
import { SmallSheet } from '@/src/shared/ui/sheet/SmallSheet';
import React from 'react';

const Page = () => {
  const { formData, onSelect, selectable } = usePlanForm();
  return (
    <>
      <BookSheet formData={formData} onSelect={onSelect} selectable={selectable} />
      <SmallSheet />
    </>
  );
};

export default Page;
