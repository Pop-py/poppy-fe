'use client';

import { ArrowRightSmall } from '@/public';
import { Hr, SecondaryButton, Title } from '@/src/shared';
import { BottomNavigation, ItemCardData, MypageHeader, PopupSlider } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const reviewsClickHandler = () => {
    router.push('/mypage/reviews');
  };

  const name = '가나다';
  const email = 'asdf1234@gmail.com';
  const reviewsCount = 7;

  return (
    <div className="h-full">
      <div>
        <MypageHeader title="마이페이지" />
      </div>
      <div className="px-16 mt-12">
        <div className="flex justify-between items-center bg-gray-50 rounded-12 border border-gray-100 pl-16 pr-8 py-18">
          <div className="flex flex-col gap-2">
            <div className="text-h2 text-black">{name}</div>
            <div className="text-b3_com text-gray-600">{email}</div>
          </div>
          <div>
            <SecondaryButton size="sm">프로필 수정</SecondaryButton>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Hr variant="bold" />
      </div>
      <div className="mt-16">
        <div className="flex flex-col w-full gap-y-12">
          <Title category="save" text1="저장한 팝업" count={recommandData.length} typography="h3" />
          <PopupSlider variant="smlist" data={recommandData} />
        </div>
      </div>
      <div className="mt-20 px-16">
        <Hr variant="hairline" />
      </div>
      <div className="mt-20">
        <Title category="reviews" text1="작성한 리뷰" count={reviewsCount} typography="h3" />
      </div>
      <div className="fixed w-full bottom-0 z-50">
        <BottomNavigation />
      </div>
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
