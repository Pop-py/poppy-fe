import React from 'react';
import Image from 'next/image';
import { SheetType } from '../../lib';
import { star } from '@/public';
import { SheetTitle } from '../shadcn/sheet';

export const Title = (props: { popUpData: SheetType }) => {
  const { title, period, rating, visitorReview, instaReview } = props.popUpData;
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex justify-between">
        <SheetTitle className="mb-0 text-left text-h2">{title}</SheetTitle>
        <div className="bg-gray-50 rounded-[20px] h-6 w-[64px] ">라벨</div>
      </div>
      <div className="text-left text-gray-500 text-b3_com">{period}</div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-0.5 items-center">
          <Image src={star} alt="rating" width={20} height={20} />
          <div className="text-b2">{rating}</div>
        </div>
        <div className="text-gray-400 text-b5">
          방문자 리뷰 {visitorReview} · 인스타 리뷰 {instaReview}
        </div>
      </div>
    </div>
  );
};
