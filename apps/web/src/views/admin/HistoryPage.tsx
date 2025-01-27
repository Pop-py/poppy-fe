'use client';
import { DatePicker, PrimaryButton } from '@/src/shared';
import useDatePicker from '@/src/shared/lib/useDatePicker';
import useTimeList from '@/src/shared/lib/useTimeList';
import { ChevronHeader } from '@/src/widgets';
import TimeList from '@/src/widgets/book/ui/TimeList';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
};

const HistoryPage = (props: Props) => {
  const { selectedDate, onSelect } = useDatePicker();
  const { time, onSelect: onSelectTime } = useTimeList({ hour: 9, minute: 0 }, { hour: 18, minute: 0 });
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/mypage/popupstore/offline/history/${selectedDate}`);
  };
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChevronHeader title={props.title} edit={false} />

      <DatePicker
        selectedDate={new Date(selectedDate)}
        onDateChange={onSelect}
        className="mt-12 px-12 pt-[20px] pb-16 rounded-12 mx-12 border-[1px] border-gray-100 bg-white"
      />

      <div className="flex flex-col justify-between h-full">
        <div className="py-16 flex flex-col gap-[16px]">
          <span className="pl-16 text-gray-900 text-h3">예약 시간</span>
          <TimeList time={time} onSelect={onSelectTime} />
        </div>

        <div className="mx-16 my-8">
          <PrimaryButton variant="enabled" onClick={onClickHandler}>
            히스토리 보기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
