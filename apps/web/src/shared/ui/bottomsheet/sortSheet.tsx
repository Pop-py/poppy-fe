'use client';
import { BottomSheet, BottomSheetContent, BottomSheetTitle, RadioGroupItem, RadioGroup } from '@/src/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';

type SortOption = {
  value: string;
  label: string;
};

type sortSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  sortType: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[]; // 정렬 옵션 배열
};

export const SortSheet = ({ isOpen, onClose, sortType, onSortChange, sortOptions }: sortSheetProps) => {
  return (
    <BottomSheet open={isOpen} onOpenChange={onClose}>
      <BottomSheetContent className="px-16">
        <BottomSheetTitle></BottomSheetTitle>
        <div className="flex flex-col items-center justify-center w-full h-full pt-[26px]">
          <span className="text-h3">정렬</span>
          <hr className="w-full mt-16 border-t border-gray-100" />
        </div>
        <RadioGroup className="flex-col w-full px-16 pt-[22px]" onValueChange={onSortChange} value={sortType}>
          {sortOptions.map(option => (
            <div key={option.value} className="flex pt-14">
              <RadioGroupItem size="lg" value={option.value} label={option.label} />
            </div>
          ))}
        </RadioGroup>
      </BottomSheetContent>
    </BottomSheet>
  );
};
