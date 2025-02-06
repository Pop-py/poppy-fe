'use client';

import React from 'react';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/src/shared/ui/carousel';

import { ArrowRightSmall } from '@/public';
import Image from 'next/legacy/image';
import { useQuery } from 'react-query';
import { getHotCategoryList } from '..';
import { CarouselSkeleton, Skeleton, Title } from '@/src/shared';

type Props = {};

const PopupCarouselXL = (props: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const hotCategory = React.useRef({ categoryId: 0, categoryName: '' });

  React.useEffect(() => {
    hotCategory.current.categoryId = Math.floor(Math.random() * 5) + 1;

    switch (hotCategory.current.categoryId) {
      case 1:
        hotCategory.current.categoryName = '패션';
        break;
      case 2:
        hotCategory.current.categoryName = '음식';
        break;
      case 3:
        hotCategory.current.categoryName = '아트';
        break;
      case 4:
        hotCategory.current.categoryName = '굿즈';
        break;
      case 5:
        hotCategory.current.categoryName = '라이프';
        break;
    }
  }, []);

  const { data, error, isLoading } = useQuery(
    ['hotCategoryList', hotCategory.current.categoryId],
    () => getHotCategoryList(hotCategory.current.categoryId),
    {
      enabled: hotCategory.current.categoryId > 0,
    },
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col w-full gap-y-12">
      <Title category={10} text1="지금 주목해야 할 " text2={hotCategory.current.categoryName} text3=" 팝업" />
      <div>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent className="ml-0">
            {isLoading ? (
              <div className="w-full h-full px-16">
                <CarouselSkeleton variant="XL" />
              </div>
            ) : (
              data?.map((item, idx) => (
                <CarouselItem key={`CAROUSEL_ITEM_${idx}`} className="px-16">
                  <div className="relative flex items-center justify-center w-full overflow-hidden rounded h-fit aspect-square">
                    <Image
                      src={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                      alt={`ITEM_${item.id}`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black/80">
                      <div className="absolute bottom-0">
                        <div className="px-16 mb-8 text-white text-h1">{item.name}</div>
                        <div
                          className="px-16 mb-16 text-white text-b3"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
        {isLoading ? (
          <div className="px-[32px]">
            <Skeleton className="flex justify-center items-center mt-8 w-full h-[6px]" />
          </div>
        ) : (
          <div className={`flex gap-4 justify-center items-center mt-8`}>
            {data?.map((_, idx) =>
              current === idx ? (
                <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-3 rounded-full border-blue-500 cursor`} />
              ) : (
                <button key={`CAROUSEL_INDC_ITEM${idx}`} className={`border-3 rounded-full border-gray-200 cursor`} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { PopupCarouselXL };
