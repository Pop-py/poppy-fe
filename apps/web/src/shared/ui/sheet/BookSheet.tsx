import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../shadcn/sheet';
import { DatePicker } from './datePicker';
import { SheetLayout } from './SheetLayout';
import { Button } from '../button';
import { FormData, Select, Selectable } from '../../lib/types';
import { TimeList } from './TimeList';
import { CountVisitors } from './CountVisitors';

type Props = {
  formData: FormData;
  onSelect: Select;
  selectable: Selectable;
};

export const BookSheet = (props: Props) => {
  const { formData, onSelect, selectable } = props;
  console.log(formData);

  return (
    <Sheet>
      <SheetTrigger>예약하기</SheetTrigger>
      <SheetContent side={'bottom'} className="rounded-t-3xl">
        <SheetLayout>
          <SheetHeader className="flex justify-center">
            <div className="mx-auto mt-2 mb-4 w-10 h-1 bg-gray-100 rounded-xl" />
            <SheetTitle>예약 정보</SheetTitle>
            <SheetDescription className="px-2 pt-6 pb-5">
              <DatePicker selectedDate={formData.date} onSelect={onSelect.date} />
            </SheetDescription>
            {!selectable.time && (
              <Button className="p-0 w-full h-11 text-gray-700 bg-gray-50 text-b3_com" variant={'default'}>
                날짜를 선택해주세요.
              </Button>
            )}
            {selectable.time && (
              <div className="flex flex-col">
                <TimeList />
                <CountVisitors />
              </div>
            )}
            {/* 높이에 따라 마진 오토 적용해야 됌 */}
            <div className="flex gap-2 py-2 mt-[110px]">
              <Button className=" py-3.5 h-12 w-full text-gray-300 bg-white border-[1px] border-gray-200 rounded-xl text-b3_com">
                초기화
              </Button>
              <Button className="py-3.5 w-full h-12 text-white bg-gray-200 rounded-xl text-b3_com border-[1px] border-gray-200">
                예약하기
              </Button>
            </div>
          </SheetHeader>
        </SheetLayout>
      </SheetContent>
    </Sheet>
  );
};
