import { Sort } from '@/public';
import { DropdownButton, FilterIconButton, ItemCard, RadioGroup, RadioGroupItem } from '@/src/shared';
import { InputHeader, ItemCardData } from '@/src/widgets';
import React from 'react';

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const keyword = (await params).category;

  return (
    <div className="h-full flex flex-col w-full">
      <div>
        <InputHeader />
      </div>
      <div className="flex px-16 mt-8 gap-8">
        <div>
          <FilterIconButton variant="inactive" />
        </div>
        <div className="flex gap-4">
          {filters.map((item, idx) => (
            <div key={`FILTER_${idx}`}>
              <DropdownButton value={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between px-16 mt-12 mb-16">
        <div className="flex flex-1 w-full">
          <RadioGroup defaultValue="operational">
            <RadioGroupItem size="sm" value="operational" label="영업중" />
            <RadioGroupItem size="sm" value="planned" label="오픈예정" />
          </RadioGroup>
        </div>
        <div className="flex items-center gap-4 text-b2 text-gray-500">
          <Sort />
          조회순
        </div>
      </div>
      <div className="overflow-y-auto">
        {recommandData.length > 0 ? (
          <div className="grid grid-cols-2 gap-y-32 gap-x-8 px-16">
            {recommandData.map((item, idx) => (
              <div key={`ITEMCARD_${idx}`} className="flex">
                <ItemCard
                  id={item.id}
                  variant="gallery"
                  img={item.img}
                  location={item.location}
                  title={item.title}
                  day={item.day}
                  deadLine={item.deadLine}
                  rank={idx + 1}
                  isCount={item.isCount}
                  ml={false}
                  mr={false}
                  imageFull
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center h-196">
              <div className="text-b1 text-gray-900">검색 결과가 없습니다.</div>
              <div className="text-b3 text-gray-400 text-center mt-8">
                다른 검색어를 입력하시거나 <br />
                철자와 띄어쓰기가 정확한지 확인해보세요.
              </div>
            </div>
            <hr className="border-4 border-gray-50" />
            <div className="px-16 mt-20">
              <div className="text-h3 text-gray-900">앗! 찾으시는 팝업이 없다면</div>
              <div className="text-b3 text-gray-400">이런 팝업은 어떠세요?</div>
            </div>
            <div className="grid grid-cols-2 gap-y-32 gap-x-8 px-16">
              {popularData.map((item, idx) => (
                <div key={`ITEMCARD_${idx}`} className="flex">
                  <ItemCard
                    id={item.id}
                    variant="gallery"
                    img={item.img}
                    location={item.location}
                    title={item.title}
                    day={item.day}
                    deadLine={item.deadLine}
                    rank={idx + 1}
                    isCount={item.isCount}
                    ml={false}
                    mr={false}
                    imageFull
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

const filters = ['날짜', '위치', '평점', '카테고리'];

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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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

const popularData: Array<ItemCardData> = [
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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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
  {
    id: 4,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 0,
    isCount: false,
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