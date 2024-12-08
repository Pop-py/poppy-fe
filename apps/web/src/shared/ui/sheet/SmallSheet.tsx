'use client';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../shadcn/sheet';
import { SheetType } from '../../lib';
import { Title } from './Title';
import { ImageList } from './ImageList';
import { SheetLayout } from './SheetLayout';

type Props = {};

export const SmallSheet = (props: Props) => {
  const [popUpData, setPopUpData] = useState<SheetType>({
    title: '오동이의 아르바이트',
    period: '24.11.22(금) - 24.12.04(수)',
    rating: 4.5,
    visitorReview: 19,
    instaReview: 7,
  });
  return (
    <Sheet>
      <SheetTrigger>상세 보기</SheetTrigger>
      <SheetContent side={'bottom'} className="rounded-t-3xl">
        <SheetLayout>
          <SheetHeader className="flex justify-center">
            <div className="mx-auto mt-2 mb-4 w-10 h-1 bg-gray-100 rounded-xl" />
            <div className="flex flex-col gap-2 mb-[14px]">
              <Title popUpData={popUpData} />
              <ImageList />
            </div>
          </SheetHeader>
        </SheetLayout>
      </SheetContent>
    </Sheet>
  );
};
