'use client';

import { Title } from '@/src/shared';
import {
  CategoryIconList,
  HomeHeader,
  PopupCarouselL,
  PopupSlider,
  BottomNavigation,
  PopupCarouselXL,
  getPopularList,
  getNewList,
  getVisitedList,
  getPlannedList,
} from '@/src/widgets';
import { ItemCardData } from '@/src/widgets/slider/model';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <div className="w-full sticky top-0 z-50">
        <HomeHeader />
      </div>
      <div className="w-full">
        <PopupCarouselL />
      </div>
      <div className="w-full px-16">
        <CategoryIconList />
      </div>
      <div className="flex flex-col gap-y-48 mt-48 mb-bottomMargin">
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="지금 많이 찾는 팝업" category="popular" />
            <PopupSlider variant="rank" queryKey="popularList" queryFn={getPopularList} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="따끈따끈, 새로 오픈한 팝업" category="new" />
            <PopupSlider variant="list" queryKey="newList" queryFn={getNewList} />
          </div>
        </div>
        <div className="w-full">
          <PopupCarouselXL text1="지금 주목해야 할 " text2="패션" text3=" 팝업" />
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="예전에 방문했던 팝업" category="visited" />
            <PopupSlider variant="list" queryKey="visitedList" queryFn={getVisitedList} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col w-full gap-y-12">
            <Title text1="오픈 예정인 팝업" category="planned" />
            <PopupSlider variant="list" queryKey="plannedList" queryFn={getPlannedList} />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Page;

const recommandData: Array<ItemCardData> = [
  {
    id: 1,
    img: 'https://placehold.co/500/webp',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
  },
];

const popularData = [
  {
    id: 1,
    img: 'https://placehold.co/500/webp',
    location: '서울 영등포구',
    title: '골든볼 팝업스토어',
    day: '05.21(금) - 12.31(일)',
    deadLine: 40,
    isCount: true,
  },
  {
    id: 2,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 3,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: false,
  },
];
