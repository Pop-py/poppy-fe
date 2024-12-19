'use client';

import { Sort } from '@/public';
import { CheckboxButton, ItemCard, PrimaryButton } from '@/src/shared';
import { ChevronHeader, ItemCardData } from '@/src/widgets';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const deleteList = React.useRef<Array<number>>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [count, setCount] = React.useState(deleteList.current.length);

  const editClickHandler = () => {
    setEditMode(prev => !prev);
  };

  const submitDeleteHandler = () => {
    if (deleteList.current.length > 0) {
      console.log('submitted!!');
    } else {
      console.log('have nothing to submit.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-white">
        <ChevronHeader
          title="저장한 팝업"
          edit={true}
          editText={editMode ? '완료' : '편집'}
          onEdit={editClickHandler}
        />
      </div>
      <div className="overflow-y-auto">
        <div className="flex justify-end mt-4 px-16">
          <div className="flex">
            <span>
              <Sort />
            </span>
            <span className="text-b2 text-gray-500 ml-4">최근 등록순</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-32 gap-x-8 px-16 mt-12">
          {recommandData.map((item, idx) => (
            <div key={`ITEMCARD_${idx}`} className="flex relative">
              {editMode && (
                <CheckboxButton
                  className="absolute top-[8px] right-[8px] z-50"
                  onCheckedChange={checked => {
                    if (checked) {
                      deleteList.current.push(item.id);
                    } else {
                      deleteList.current.splice(deleteList.current.indexOf(item.id), 1);
                    }
                    console.log(`is ${item.title} checked? ` + checked);
                    setCount(deleteList.current.length);
                  }}
                />
              )}
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
                noRoute={editMode}
              />
            </div>
          ))}
        </div>
        <div className="mt-bottomMargin" />
        {editMode && (
          <div className="fixed bottom-0 z-50 w-full flex justify-center items-center py-8 px-16 bg-white">
            <PrimaryButton
              variant={deleteList.current.length > 0 ? 'enabled' : 'disabled'}
              onClick={submitDeleteHandler}>
              {count > 0 ? `${count}개의 항목 삭제하기` : '삭제할 항목을 선택해주세요'}
            </PrimaryButton>
          </div>
        )}
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
    deadLine: 3,
    isCount: true,
  },
  {
    id: 5,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 6,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 7,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
  {
    id: 8,
    img: 'https://placehold.co/500/webp',
    location: '서울 성동구',
    title: '어노브 이터널 아우라 성수 팝업스토어',
    day: '11.08(금) - 11.24(일)',
    deadLine: 3,
    isCount: true,
  },
];
