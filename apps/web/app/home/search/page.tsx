'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  InputChip,
  Skeleton,
  Title,
} from '@/src/shared';
import { getVisitedList, InputHeader, PopupSlider } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLoginStore } from 'store/login/loginStore';
import { deleteAllSearchHistories, deleteSearchHistory, getSearchHistory } from '@/src/entities';
import { useQuery } from 'react-query';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const lastUpdate = '12. 02 10:00 업데이트';

  const { token } = useLoginStore();

  const [recentlySearched, setRecentlySearched] = React.useState<Array<string>>([]);

  const { isLoading } = useQuery(['getSearchHistory'], () => getSearchHistory(token!), {
    enabled: !!token,
    onSuccess: results => setRecentlySearched(results),
  });

  const deleteChipHandler = (chip: string) => {
    if (token) {
      deleteSearchHistory(chip, token).then(result => {
        if (result) {
          setRecentlySearched(recentlySearched.filter(val => val !== chip));
        } else {
          alert(`Failed to delete search history of '${chip}'.`);
        }
      });
    }
  };

  const deleteAllChipsHandler = () => {
    // setRecentlySearched(prev => {
    //   const arr = [...prev];
    //   while (arr.length > 0) {
    //     const deleted = arr.pop();
    //     // 삭제 API 요청
    //   }
    //   return arr;
    // });
    if (token) {
      deleteAllSearchHistories(token).then(result => {
        if (result) {
          setRecentlySearched([]);
        } else {
          alert(`Failed to delete search histories.`);
        }
      });
    }
  };

  return (
    <div>
      <div>
        <InputHeader onSearch={keyword => router.push(`/home/search/${keyword}`)} />
      </div>
      <div className="flex justify-between px-16 my-16">
        <div className="text-gray-900 text-h3">최근 검색어</div>
        <AlertDialog>
          <AlertDialogTrigger variant="enabled">
            <div className="text-gray-500 underline cursor-pointer text-c1">지우기</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>최근 검색 삭제</AlertDialogTitle>
              <AlertDialogDescription>검색 기록을 모두 삭제하시겠습니까?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction variant="warning" onClick={deleteAllChipsHandler} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex px-16 min-h-[64px]">
        {isLoading ? (
          <Skeleton className="w-full h-32" />
        ) : recentlySearched.length > 0 ? (
          // 최근 검색 기록이 하나 이상일 경우
          <div className="flex flex-wrap w-full gap-8 h-fit">
            {recentlySearched.map((item, idx) => (
              <InputChip key={`CHIP_${idx}`} value={item} onDelete={deleteChipHandler} />
            ))}
          </div>
        ) : (
          // 최근 검색 기록이 하나도 없을 경우
          <div className="flex items-center justify-center w-full text-gray-400 text-b3">
            최근 검색 내역이 없습니다.
          </div>
        )}
      </div>
      <div className="flex justify-between px-16 mt-16">
        <div className="text-gray-900 text-h3">인기 검색어</div>
        <div className="text-gray-400 text-c2">{lastUpdate}</div>
      </div>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-8 px-16 mt-16 mb-bottomMargin">
        {mostSearched.map((item, idx) => (
          <div key={`ITEM_${idx}`} className="flex items-center">
            <div className="w-16 text-center text-gray-900 text-b2">{idx + 1}</div>
            <div className="ml-16 text-gray-900 truncate text-b3 grow">{item}</div>
          </div>
        ))}
      </div>
      <div className="flex mt-16 mb-bottomMargin">
        <div className="flex flex-col w-full gap-y-12">
          <Title text1="최근 본 팝업" category={8} />
          <PopupSlider variant="list" queryKey="visitedList" queryFn={getVisitedList} />
        </div>
      </div>
    </div>
  );
};

export default Page;

const mostSearched: Array<string> = [
  '일둥이□■□□□□■□□□',
  '이둥이',
  '삼둥이',
  '사둥이',
  '오둥이',
  '육둥이일이삼사오육칠팔구십십일',
  '칠둥이',
  '팔둥이',
  '구둥이',
  '십둥이',
];
