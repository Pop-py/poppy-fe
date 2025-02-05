'use client';

import { ActivityListItem, getActivityNotices, getNotices, NoticeListItem } from '@/src/entities';
import { IconButton, Skeleton, Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared';
import { ChevronHeader, SubHeader } from '@/src/widgets';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueries, useQuery } from 'react-query';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

const Page = () => {
  const router = useRouter();
  const { userInfoData } = useUserInfo();
  const { token } = useLoginStore();

  const queries = useQueries([
    {
      queryKey: ['getNotices'],
      queryFn: getNotices,
    },
    {
      queryKey: ['getActivityNotices'],
      queryFn: () => getActivityNotices(token!, userInfoData.userId),
      // queryFn: () => getActivityNotices(token!),

      // enabled: !!token && !!userInfoData.userId,
    },
  ]);

  const NoticeItem = (item: NoticeListItem) => (
    <div
      className="p-12 mb-8 bg-white border border-gray-100 rounded"
      onClick={() => router.push(`/notice/${item.id}/`)}>
      <div>
        <div className="text-blue-600 text-h4">{`[공지사항]`}</div>
        <div className="text-gray-800 text-b1">{item.title}</div>
        <div className="mt-16 text-gray-300 text-c2">{`${item.createdDate} ${item.createdTime}`}</div>
      </div>
    </div>
  );

  const ActivityItem = (item: ActivityListItem) => {
    const router = useRouter();

    const handleClick = () => {
      if (item.type === 'RESERVATION') {
        router.push(`/book/${item.userId}`);
      }
    };
    return (
      <div
        className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]"
        onClick={handleClick}>
        <div className="flex gap-x-[12px]">
          <IconButton size="xlg" icon="ic-noti-cal" />
          <div className="flex flex-col gap-y-[16px] w-full ">
            <div className="flex flex-col ">
              <span className="text-blue-600 text-h4">[{item.popupStoreName}]</span>
              <span className="text-gray-800 text-b1">{item.message}</span>
              {item.type === 'TEAMS_AHEAD' && (
                <span className="text-gray-500 text-b5">잠시 후 입장 예정이니, 매장 앞에서 대기해 주세요.</span>
              )}
            </div>
            <div>
              <span className="text-gray-300 text-c2">{`${item.noticeDate}. ${item.noticeTime}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="notifications" className="flex flex-col w-full h-full bg-gray-50">
        <div className="relative">
          <ChevronHeader title="알림" edit={false} />
          <TabsList className="px-0 pb-0 bg-white">
            <TabsTrigger value="notifications">공지</TabsTrigger>
            <TabsTrigger value="activities">활동</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="notifications" className="h-full my-0 overflow-y-scroll">
          <div className="px-16 py-12 bg-gray-50">
            {queries[0].isLoading
              ? Array.from({ length: 8 }, (_, idx) => (
                  <div key={`SKEL_${idx}`} className="p-12 mb-8 bg-white border border-gray-100 rounded">
                    <div>
                      <Skeleton className="h-40 w-[300px]" />
                      <Skeleton className="h-16 mt-16 w-[100px]" />
                    </div>
                  </div>
                ))
              : queries[0].data?.map((item, idx) => (
                  <NoticeItem
                    key={`ITEM_${idx}`}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    createdDate={item.createdDate}
                    createdTime={item.createdTime}
                  />
                ))}
          </div>
        </TabsContent>
        <TabsContent value="activities" className="h-full my-0 overflow-y-scroll">
          <div className="px-16 py-12 bg-gray-50">
            {queries[1].isLoading
              ? Array.from({ length: 8 }, (_, idx) => (
                  <div
                    key={`SKELETON_${idx}`}
                    className="flex flex-col p-12 mb-8 bg-white border border-gray-100 rounded gap-y-[8px]">
                    <div className="flex gap-x-[12px]">
                      <IconButton size="xlg" icon="ic-noti-cal" />
                      <div className="flex flex-col gap-y-[16px] w-full ">
                        <div className="flex flex-col justify-around h-40">
                          <Skeleton className="h-16 w-[200px]" />
                          <Skeleton className="h-16 w-[200px]" />
                        </div>
                        <div className="h-16">
                          <Skeleton className="h-[12px] w-[150px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : queries[1].data &&
                queries[1].data.map((item, idx) => (
                  <ActivityItem
                    key={`ITEM_${idx}`}
                    userId={item.userId}
                    popupStoreId={item.popupStoreId}
                    popupStoreName={item.popupStoreName}
                    type={item.type}
                    message={item.message}
                    noticeDate={item.noticeDate}
                    noticeTime={item.noticeTime}
                    isRead={item.isRead}
                  />
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
