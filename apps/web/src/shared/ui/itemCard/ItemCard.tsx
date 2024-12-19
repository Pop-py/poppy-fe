'use client';

import Image from 'next/image';
import { DateLabel } from '../..';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

type VariantType = 'list' | 'gallery' | 'rank' | 'smlist';

type Props = {
  id: number;
  variant: VariantType;
  img: string;
  location: string;
  title: string;
  day: string;
  deadLine: number;
  rank: number;
  isCount: boolean;
  ml: boolean;
  mr: boolean;
  /**@description true일 경우 이미지가 아이템 카드의 폭에 맞춰 넓어짐 */
  imageFull?: boolean;
  /**@description true일 경우 아이템 카드 클릭 시 페이지를 이동하지 않음 */
  noRoute?: boolean;
};

export const ItemCard = memo(
  ({
    id,
    variant,
    img,
    location,
    title,
    day,
    deadLine,
    rank,
    isCount,
    ml,
    mr,
    imageFull = false,
    noRoute = false,
  }: Props) => {
    const router = useRouter();

    const itemCardClickHandler = (id: number) => {
      if (!noRoute) router.push(`/detail/${id}`);
    };

    const getDimensions = (variant: VariantType) => {
      switch (variant) {
        case 'list':
          return { width: 160, height: 160 };
        case 'gallery':
          return { width: 168, height: 168 };
        case 'rank':
          return { width: 192, height: 248 };
        case 'smlist':
          return { width: 136, height: 136 };
        default:
          return { width: 160, height: 160 };
      }
    };

    const { width, height } = getDimensions(variant);

    return (
      <div
        className={`flex shrink-0 flex-col gap-2 ${ml ? 'ml-16' : ''} ${mr ? 'mr-16' : ''}`}
        style={{ width: imageFull ? '100%' : `${width}px` }}
        onClick={() => itemCardClickHandler(id)}>
        {/* 이미지 섹션 */}
        <div className="relative overflow-hidden" style={{ height: imageFull ? '100%' : `${height}px` }}>
          {imageFull ? (
            <Image
              src={img}
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={500}
              height={500}
              alt={title}
              className="object-cover rounded-sm"
            />
          ) : (
            <Image src={img} width={width} height={height} alt={title} className="rounded-sm" />
          )}
          {variant === 'rank' && (
            <div className="absolute rounded-tl-sm rounded-br-sm w-[24px] h-[24px] flex text-center justify-center top-0 left-0 bg-gray-900 text-white ">
              {rank}
            </div>
          )}
          {isCount && (
            <div className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-purple-500 rounded-sm">
              마감임박
            </div>
          )}
        </div>

        {/* 텍스트 섹션 */}
        <div className={`flex flex-col`}>
          <div className="text-gray-600 text-b4">{location}</div>
          <div
            className={`mt-2 overflow-hidden text-h4 max-w-[${width}px] text-gray-900 whitespace-nowrap text-ellipsis`}>
            {title}
          </div>
          <div className="mt-2 text-gray-500 text-b5">{day}</div>
        </div>
        <DateLabel status="operational" daysLeft={deadLine} />
      </div>
    );
  },
);

ItemCard.displayName = 'ItemCard';
