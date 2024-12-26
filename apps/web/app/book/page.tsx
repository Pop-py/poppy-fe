'use client';
import * as React from 'react';
import {
  ChoiceChipGroup,
  ChoiceChipGroupItem,
  IconButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared';
import { BottomNavigation, NoChevronHeader } from '@/src/widgets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookListItem } from '@/src/entities/book';
type Props = {};

const BookItem = (item: BookListItem) => {
  const router = useRouter();
  const status = [
    { style: 'text-h4 text-blue-600', text: '예약완료' },
    { style: 'text-h4 text-warning', text: '예약취소' },
    { style: 'text-h4 text-gray-400', text: '방문완료' },
  ];

  const handleClick = () => {
    router.push(`/book/${item.storeId}`);
  };
  return (
    <div className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]" onClick={handleClick}>
      <div className={status[item.reservationStatus].style}>{status[item.reservationStatus].text}</div>
      <div className="flex gap-x-[12px]">
        <Image
          className="rounded-4"
          src={`https://placehold.co/500/webp`}
          alt={`ITEM_${item.storeId}`}
          width={104}
          height={104}
        />
        <div className="flex flex-col gap-y-[8px]  justify-center">
          <span className="text-gray-900 text-h4">{item.popupStoreName}</span>
          <div className=" text-b5">
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px] ">일정</p>
              <p className="text-gray-700">{item.reservationDate}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">위치</p>
              <p className="text-gray-700">{item.location}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">인원</p>
              <p className="text-gray-700">{item.person}명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WaitItem = (item: BookListItem) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/book/wait/${item.storeId}`);
  };
  return (
    <div className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]" onClick={handleClick}>
      <div className="flex gap-x-[12px]">
        <Image
          className="rounded-4"
          src={`https://placehold.co/500/webp`}
          alt={`ITEM_${item.storeId}`}
          width={104}
          height={104}
        />
        <div className="flex flex-col gap-y-[8px]  justify-center">
          <span className="text-gray-900 text-h4">{item.popupStoreName}</span>
          <div className=" text-b5">
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px] ">일정</p>
              <p className="text-gray-700">{item.reservationDate}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">위치</p>
              <p className="text-gray-700">{item.location}</p>
            </div>
            <div className="flex gap-x-[8px]">
              <p className="text-gray-400 min-w-[23px]">인원</p>
              <p className="text-gray-700">{item.person}명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = (props: Props) => {
  const chipItem = ['전체', '예약완료', '방문완료', '예약취소'] as const;
  const [selectedStatus, setSelectedStatus] = React.useState<(typeof chipItem)[number]>('전체'); // 타입을 지정

  const handleTabChange = (tab: string) => {
    setSelectedStatus('전체');
  };

  // 상태에 맞는 데이터만 필터링하는 함수
  const filteredData = reservationData.filter(item => {
    if (selectedStatus === '전체') {
      return true; // 전체 선택 시 모든 항목 표시
    }
    // 상태별로 필터링
    const statusMap = {
      예약완료: 0,
      방문완료: 2,
      예약취소: 1,
    } as const;

    return item.reservationStatus === statusMap[selectedStatus];
  });

  return (
    <div className="h-full">
      <Tabs defaultValue="reservations" onValueChange={handleTabChange} className="flex flex-col w-full bg-gray-50 ">
        <div className="relative">
          <NoChevronHeader title="예약" />
          <TabsList className="px-0 pt-8 pb-0 bg-white">
            <TabsTrigger value="reservations">예약내역</TabsTrigger>
            <TabsTrigger value="waitings">대기내역</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="reservations" className="my-0">
          <div className="px-16 py-12 bg-gray-50">
            <ChoiceChipGroup className="flex flex-row gap-x-[8px]" defaultValue={'전체'}>
              {chipItem.map(item => (
                <ChoiceChipGroupItem
                  key={item}
                  value={item}
                  onClick={() => setSelectedStatus(item)} // 클릭 시 상태 변경
                >
                  {item}
                </ChoiceChipGroupItem>
              ))}
            </ChoiceChipGroup>
            {/* 예약 항목들 필터링 후 표시 */}
            <div className="overflow-y-scroll h-[calc(100vh-218px)] mt-[12px]">
              {filteredData.map((item, idx) => (
                <BookItem
                  key={`ITEM_${idx}`}
                  thumbnail={item.thumbnail}
                  storeId={item.storeId}
                  userId={item.userId}
                  popupStoreName={item.popupStoreName}
                  reservationStatus={item.reservationStatus}
                  reservationDate={item.reservationDate}
                  reservationTime={item.reservationTime}
                  location={item.location}
                  person={item.person}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="waitings" className="my-0 ">
          <div className="px-16 py-12 bg-gray-50">
            <ChoiceChipGroup className="flex flex-row gap-x-[8px]" defaultValue={'전체'}>
              {chipItem.map(item => (
                <ChoiceChipGroupItem
                  key={item}
                  value={item}
                  onClick={() => setSelectedStatus(item)} // 클릭 시 상태 변경
                >
                  {item}
                </ChoiceChipGroupItem>
              ))}
            </ChoiceChipGroup>
            {/* 예약 항목들 필터링 후 표시 */}
            <div className="overflow-y-scroll h-[calc(100vh-218px)] mt-[12px]">
              {filteredData.map((item, idx) => (
                <WaitItem
                  key={`ITEM_${idx}`}
                  thumbnail={item.thumbnail}
                  storeId={item.storeId}
                  userId={item.userId}
                  popupStoreName={item.popupStoreName}
                  reservationStatus={item.reservationStatus}
                  reservationDate={item.reservationDate}
                  reservationTime={item.reservationTime}
                  location={item.location}
                  person={item.person}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <BottomNavigation />
    </div>
  );
};

export default Page;

const reservationData: Array<BookListItem> = [
  {
    userId: 1,
    storeId: 1,
    status: 'CHECKED',
    thumbnail: 'https://placehold.co/500/webp',
    popupStoreName: '오둥이의 아르바이트',
    reservationStatus: 0,
    reservationDate: '2024. 11. 18(월)',
    reservationTime: '오후 1:00',
    location: '서울 강남구 강남대로 426',
    person: 2,
  },

  {
    userId: 1,
    storeId: 2,
    status: 'CANCELED',
    thumbnail: 'https://placehold.co/500/webp',
    popupStoreName: '롯데 크리스마스 마켓 2024',
    reservationStatus: 1,
    reservationDate: '2024. 11. 20(수)',
    reservationTime: '오후 2:00',
    location: '서울 송파구 올림픽로 300 잠실 롯데월드몰 잔디광장',
    person: 2,
  },
  {
    userId: 1,
    storeId: 3,
    status: 'VISITED',
    thumbnail: 'https://placehold.co/500/webp',
    popupStoreName: '제로이드 X 올리브영 팝업스토어',
    reservationStatus: 2,
    reservationDate: '2024. 11. 01(월)',
    reservationTime: '오후 5:00',
    location: '서울 서초구 강남대로 429 올리브영 강남타운',
    person: 12,
  },
];