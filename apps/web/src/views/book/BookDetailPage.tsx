'use client';
import { formatWithThousandsSeparator } from '@/src/shared/lib/utils';
import { ChevronHeader } from '@/src/widgets';
import Image from 'next/legacy/image';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { getPopupDetail, getReservationDetail } from '@/src/widgets/book/api/bookApi';
import { useQueries } from 'react-query';
import { useLoginStore } from 'store/login/loginStore';
import { Skeleton } from '@/src/shared';

const BookDetailPage = () => {
  const searchParams = useSearchParams();

  const reservationId = searchParams.get('reservationId');
  if (!reservationId) throw new Error('reservationId is empty');

  const popupId = searchParams.get('popupId');
  if (!popupId) throw new Error('popupId is empty');

  const { token } = useLoginStore();
  if (!token) throw new Error('token is empty');

  // 0번 = 예약 데이터
  // 1번 = 팝업스토어 데이터
  const queries = useQueries([
    {
      queryKey: ['getReservationDetail', reservationId],
      queryFn: () => getReservationDetail(reservationId, token),
    },
    {
      queryKey: ['getPopupDetail', popupId],
      queryFn: () => getPopupDetail(Number(popupId)),
    },
  ]);

  return (
    <div className="flex flex-col items-center h-full">
      <ChevronHeader title="예약 상세" edit={false} />

      <div className="pt-[20px] px-16 pb-[24px] w-full flex flex-col gap-[16px]">
        <span className="text-gray-900 text-h2">예약 정보</span>

        <div className="rounded-12 border-[1px] border-gray-200 py-16 pl-12 pr-16">
          <div className="flex items-center w-full gap-x-12">
            {queries[1].isLoading ? (
              <Skeleton className="rounded-4 min-w-[104px] h-[104px] w-[104px]" />
            ) : (
              queries[1].data && (
                <Image
                  className="border rounded-4 min-w-[104px]"
                  src={queries[1].data.thumbnailUrl}
                  alt="book"
                  width={104}
                  height={104}
                />
              )
            )}

            <div className="my-[10px] ml-12">
              {queries[0].isLoading ? (
                <span className="block h-20 mb-8">
                  <Skeleton className="w-[120px] h-[15px]" />
                </span>
              ) : (
                queries[0].data && (
                  <span className="block mb-8 text-gray-900 text-h4">{queries[0].data.popupStoreName}</span>
                )
              )}
              <div className="flex flex-col gap-4 leading-[16px]">
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 align-top text-b5 text-nowrap">일정</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    queries[0].data && (
                      <span className="text-gray-700 text-b5">
                        {queries[0].data.date} {queries[0].data.time}
                      </span>
                    )
                  )}
                </div>
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 text-b5 text-nowrap">위치</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[120px]" />
                    </span>
                  ) : (
                    queries[0].data && <span className="text-gray-700 text-b5">{queries[0].data.address}</span>
                  )}
                </div>
                <div className="flex items-start">
                  <span className="mr-8 text-gray-400 text-b5 text-nowrap">인원</span>
                  {queries[0].isLoading ? (
                    <span className="h-[16px]">
                      <Skeleton className="h-[13px] w-[32px]" />
                    </span>
                  ) : (
                    queries[0].data && <span className="text-gray-700 text-b5">{queries[0].data.person}명</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[20px] pl-16 pb-[24px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">예약자 정보</span>
        <div>
          <div>
            <div className="flex items-center mb-2 gap-x-12">
              <span className="text-gray-400 text-b3">예약자</span>
              {queries[0].isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                queries[0].data && <span className="text-gray-600 text-b2">{queries[0].data.userNickname}</span>
              )}
            </div>
            <div className="flex items-center gap-x-12">
              <span className="text-gray-400 text-b3">연락처</span>
              {queries[0].isLoading ? (
                <Skeleton className="w-[100px] h-[14px]" />
              ) : (
                queries[0].data && <span className="text-gray-600 text-b2">{queries[0].data.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full h-2 border-0 bg-gray-50" />

      <div className="pt-[24px] px-16 pb-[150px] w-full flex flex-col gap-[20px]">
        <span className="text-gray-900 text-h2">결제 정보</span>
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-b3">상품금액</span>
            {queries[0].isLoading ? (
              <Skeleton className="w-[100px] h-[14px]" />
            ) : (
              queries[0].data && (
                <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(queries[0].data.amount)}원</span>
              )
            )}
          </div>
          {/* <div className="flex justify-between mb-12">
            <span className="text-gray-400 text-b3">보증금</span>
            <span className="text-gray-600 text-b2">{formatWithThousandsSeparator(security)}원</span>
          </div> */}
          <div className="border-b-[1px] border-gray-100 mb-12" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-b2">총 결제금액</span>
              {queries[0].isLoading ? (
                <span className="flex items-center h-24">
                  <Skeleton className="w-[120px] h-[17px]" />
                </span>
              ) : (
                queries[0].data && (
                  <span className="text-blue-700 text-h2">
                    {formatWithThousandsSeparator(queries[0].data.amount)}원
                  </span>
                )
              )}
            </div>
            <div className="flex items-center justify-end">
              {queries[0].isLoading ? (
                <span className="flex items-center h-20">
                  <Skeleton className="w-[100px] h-[14px]" />
                </span>
              ) : (
                queries[0].data && <span className="text-gray-600 text-b3">{queries[0].data.paymentMethod}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
