'use client';

import { BottomSheet, BottomSheetContent, BottomSheetHeader, BottomSheetTitle } from '@/src/shared';
import { Sort } from '@/public';
import { getScrapList } from '@/src/entities';
import { deleteScraps } from '@/src/entities/mypage/api/mypageAPI';
import { CheckboxButton, formatToMD, ItemCard, ItemCardSkeleton, PrimaryButton } from '@/src/shared';
import { SortSheet } from '@/src/shared/ui/bottomsheet/sortSheet';
import { ChevronHeader, ItemCardData } from '@/src/widgets';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';

const Page = () => {
  const { token } = useLoginStore();

  const deleteList = React.useRef<Array<number>>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [count, setCount] = React.useState(deleteList.current.length);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [sortType, setSortType] = React.useState('RECENT_SAVED');
  const [page, setPage] = useState<number>(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);

  const sortOptionsForSaves = [
    { value: 'RECENT_SAVED', label: '최근 저장한 순' },
    { value: 'OPEN_DATE', label: '오픈일순' },
    { value: 'END_DATE', label: '종료일순' },
  ];

  const handleSortChange = (value: string) => {
    setSortType(value); // 정렬 타입 업데이트
    setIsSortSheetOpen(false); // 정렬 시트 닫기
    refetch(); // 데이터를 새로 가져오기
  };

  const editClickHandler = () => {
    setEditMode(prev => !prev);
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['getScrapList', sortType], // Query key에 sortType 추가
    () => getScrapList(token!, sortType || 'RECENT_SAVED'), // sortType이 없을 경우 기본값으로 처리
    {
      enabled: !!token, // 토큰이 존재할 때만 실행
    },
  );

  const submitDeleteHandler = async () => {
    if (deleteList.current.length > 0) {
      try {
        // 삭제 요청 실행
        const isDeleted = await deleteScraps(deleteList.current, token as string);

        if (isDeleted) {
          deleteList.current = [];
          setCount(0);

          await refetch();
        } else {
          console.log('삭제 실패');
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
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
        <div className="flex justify-end px-16 mt-4">
          <button
            className="flex items-center gap-x-[4px]"
            type="button"
            onClick={() => {
              setIsSortSheetOpen(true);
            }}>
            <Sort />
            <span className="text-gray-500 text-b2">최근 등록순</span>
          </button>
        </div>
        <div className="grid grid-cols-2 px-16 mt-12 gap-y-32 gap-x-8">
          {isLoading
            ? Array.from({ length: 8 }, (_, idx) => <ItemCardSkeleton key={`SKEL_${idx}`} variant="imageFull" />)
            : data?.map((item, idx) => (
                <div key={`ITEMCARD_${idx}`} className="relative flex">
                  {editMode && (
                    <CheckboxButton
                      className="absolute top-[8px] right-[8px] z-50"
                      onCheckedChange={checked => {
                        if (checked) {
                          deleteList.current.push(item.scrapId);
                        } else {
                          deleteList.current.splice(deleteList.current.indexOf(item.scrapId), 1);
                        }
                        setCount(deleteList.current.length);
                      }}
                    />
                  )}
                  <ItemCard
                    id={item.scrapId}
                    variant="gallery"
                    img={item.thumbnailUrl ? item.thumbnailUrl : 'https://placehold.co/500/webp'}
                    location={item.location}
                    title={item.name}
                    day={`${formatToMD({ year: item.startDate.year, month: item.startDate.month, day: item.startDate.day })} - ${formatToMD({ year: item.endDate.year, month: item.endDate.month, day: item.endDate.day })}`}
                    deadLine={0}
                    rank={idx + 1}
                    isCount={item.isAlmostFull}
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
          <div className="fixed bottom-0 z-50 flex items-center justify-center w-full px-16 py-8 bg-white">
            <PrimaryButton
              variant={deleteList.current.length > 0 ? 'enabled' : 'disabled'}
              onClick={submitDeleteHandler}>
              {count > 0 ? `${count}개의 항목 삭제하기` : '삭제할 항목을 선택해주세요'}
            </PrimaryButton>
          </div>
        )}
      </div>

      <SortSheet
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        sortType={sortType}
        onSortChange={handleSortChange}
        sortOptions={sortOptionsForSaves}
      />
    </div>
  );
};

export default Page;
