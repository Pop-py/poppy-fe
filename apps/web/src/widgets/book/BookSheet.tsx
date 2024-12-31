import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  DatePicker,
  PrimaryButton,
  SecondaryButton,
  useCounter,
} from '@/src/shared';
import React from 'react';
import BookingForm from './ui/BookingForm';
import useDatePicker from '@/src/shared/lib/useDatePicker';
import { useRouter } from 'next/navigation';
import useBooking from '@/src/shared/lib/useBooking';

type Props = {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookSheet = (props: Props) => {
  const router = useRouter();
  const { bookData, onSelect, onReset, countHandler, discountHandler, time, onSelectTime } = useBooking();
  const { date: selectedDate, people } = bookData;

  const bookButtonClickHandler = () => {
    console.log(bookData);
    router.push('/detail/book');
  };

  return (
    <div>
      <BottomSheet open={props.isBottomSheetOpen} onOpenChange={props.setIsBottomSheetOpen}>
        <BottomSheetContent>
          <BottomSheetHeader className="border-b-[1px] border-gray-100">
            <span className="mt-[18px] mb-16">예약 정보</span>
          </BottomSheetHeader>
          <div className="mx-24 mb-8 mt-[25px]">
            <DatePicker selectedDate={selectedDate} onSelect={onSelect} />
          </div>
          <div className=" border-t-[1px] border-gray-100">
            {!selectedDate && (
              <div className="flex justify-center items-center py-12 m-16 bg-gray-100 rounded">
                <span className="text-gray-700 text-b3">날짜를 선택해주세요.</span>
              </div>
            )}
            {selectedDate && (
              <BookingForm
                count={people}
                countHandler={countHandler}
                discountHandler={discountHandler}
                time={time}
                onSelectTime={onSelectTime}
              />
            )}
            <div className="flex gap-8 px-16 py-8">
              <SecondaryButton variant={selectedDate ? 'default' : 'disabled'} onClick={onReset}>
                초기화
              </SecondaryButton>
              <PrimaryButton variant={selectedDate ? 'enabled' : 'disabled'} onClick={bookButtonClickHandler}>
                예약하기
              </PrimaryButton>
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
};

export default BookSheet;
