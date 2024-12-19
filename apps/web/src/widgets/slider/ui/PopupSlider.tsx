'use client';

import { ArrowRightSmall } from '@/public';
import { ItemCard } from '@/src/shared';
import React from 'react';
import { ItemCardData } from '../model';
import { useRouter } from 'next/navigation';

type Props = {
  /**@description 슬라이더 아이템의 크기 및 종류 설정 */
  variant: 'list' | 'gallery' | 'rank' | 'smlist';
  /**@description 첫 번째 문구(강조 문구 없을 시 이것만 사용) */
  text1?: string;
  /**@description 두 번째 파란색 문구(강조할 시 사용) */
  text2?: string;
  /**@description 세 번째 검은색 문구 */
  text3?: string;
  /**@description 슬라이더에 담길 팝업스토어 목록 */
  data: Array<ItemCardData>;
  /**@description 샤프롱 클릭 시 보여지는 화면에서 어떤 카테고리의 목록을 가져올 지 선택 */
  category?: string;
  /**@description 제목 오른쪽에 목록 개수를 표시 */
  showCount?: boolean;
  /**@description 제목 타이포그래피 설정 */
  typography?: 'h2' | 'h3';
};

export const PopupSlider = ({ showCount = false, typography = 'h2', ...props }: Props) => {
  const router = useRouter();

  const moreClickHandler = () => {
    if (props.category === 'save') {
      router.push(`/mypage/saves/`);
    } else {
      router.push(`/home/more/${props.category}`);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-12">
      <div className="flex w-full justify-between items-center px-16" onClick={moreClickHandler}>
        <div className="flex items-center gap-4">
          {props.text1 ? <span className={`text-${typography} text-gray-900`}>{props.text1}</span> : null}
          {props.text2 ? <span className={`text-${typography} text-blue-700`}>{props.text2}</span> : null}
          {props.text3 ? <span className={`text-${typography} text-gray-900`}>{props.text3}</span> : null}
          {showCount ? <span className="text-h4 text-gray-300">{props.data.length}</span> : null}
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div>
      <div className="flex w-full overflow-x-auto gap-4">
        {props.data.map((item, idx) => (
          <ItemCard
            id={item.id}
            key={`ITEMCARD_${idx}`}
            variant={props.variant}
            img={item.img}
            location={item.location}
            title={item.title}
            day={item.day}
            deadLine={item.deadLine}
            rank={idx + 1}
            isCount={item.isCount}
            ml={idx === 0 ? true : false}
            mr={idx === props.data.length - 1 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
