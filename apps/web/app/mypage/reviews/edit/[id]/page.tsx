import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import Image from 'next/image';
import { Hr, IconButton, PrimaryButton, Textarea } from '@/src/shared';
import { Camera } from '@/public';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;

  return (
    <div>
      <ChevronHeader title="리뷰 수정하기" edit={false} />
      <div className="flex px-16 mt-16 gap-x-12">
        <div>
          <Image
            width={64}
            height={64}
            src={'https://placehold.co/500/webp'}
            alt={`review-${id}`}
            className="object-cover rounded-4"
          />
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="text-h4 text-gray-900">오둥이의 아르바이트</div>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-8">
              <span className="text-b5 text-gray-400">일정</span>
              <span className="text-b5 text-gray-700">2024. 11. 18(월) 오후 1:30</span>
            </div>
            <div className="flex gap-x-8">
              <span className="text-b5 text-gray-400">인원</span>
              <span className="text-b5 text-gray-700">2명</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Hr variant="hairline" />
      </div>
      <div className="text-h4 text-gray-900 px-16 mt-20">방문하신 팝업스토어, 어떠셨나요?</div>
      <div className="flex px-16 mt-8 gap-4">
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
        <div>
          <IconButton icon="ic-star" size="xlg" />
        </div>
      </div>
      <div className="text-h4 text-gray-900 px-16 mt-32">리뷰 작성</div>
      <div className="flex px-16 mt-12 gap-8 overflow-x-scroll">
        <div className="flex flex-shrink-0 flex-col justify-center items-center w-80 h-80 bg-gray-50 border border-gray-100 rounded-4 gap-y-4">
          <span>
            <Camera />
          </span>
          <span className="text-c1 text-gray-400">0 / 5</span>
        </div>
        {images.map((item, idx) => (
          <div key={`IMG_${idx}`} className="relative flex-shrink-0 w-80 h-80">
            <Image fill src={item} alt={`img-${idx}`} className="object-cover rounded-4" />
          </div>
        ))}
      </div>
      <div className="px-16 mt-12">
        <Textarea />
      </div>
      <div className="fixed bottom-0 z-50 w-full flex justify-center items-center py-8 px-16 bg-white">
        <PrimaryButton variant={'enabled'}>{'작성 완료'}</PrimaryButton>
      </div>
    </div>
  );
};

export default Page;

const images = [
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
  'https://placehold.co/500/webp',
];
