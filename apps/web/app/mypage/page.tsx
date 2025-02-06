'use client';

import { ArrowRightSmall } from '@/public';
import { getReviewList, getScrapList } from '@/src/entities';
import { Hr, SecondaryButton, Title } from '@/src/shared';
import { BottomNavigation, MypageHeader, PopupListItem, PopupSlider } from '@/src/widgets';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueries, useQuery } from 'react-query';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

type Props = {};

type PopUpStoreState = 'offline' | 'online';

const Page = (props: Props) => {
  const router = useRouter();
  const { userInfoData } = useUserInfo();
  const { token } = useLoginStore();

  const queries = useQueries([
    {
      queryKey: ['getScrapListCount'],
      queryFn: () => getScrapList(token!),
      enabled: !!token,
    },
    {
      queryKey: ['getReviewListCount'],
      queryFn: () => getReviewList(token!),
      enabled: !!token,
    },
  ]);

  const reviewsClickHandler = () => {
    router.push('/mypage/reviews');
  };

  const editClickHandler = () => {
    router.push('/mypage/edit');
  };

  const loginClickHandler = () => {
    router.push('/login');
  };

  // online, offline 유저 개시 팝업스토어 상태에 따라 페이지 이동
  const myPopUpStoreClickHandler = (userState: PopUpStoreState) => {
    if (userState === 'offline') {
      router.push('/mypage/popupstore/offline');
    } else {
      router.push('/mypage/popupstore/online/history');
    }
  };

  return (
    <div className="h-full">
      <div>
        <MypageHeader title="마이페이지" />
      </div>
      <div className="px-16 mt-12">
        <div className="flex items-center justify-between pl-16 pr-8 border border-gray-100 bg-gray-50 rounded-12 py-18">
          <div className="flex flex-col gap-2">
            {!token ? (
              <div className="text-black text-h2">로그인 해주세요</div>
            ) : (
              <>
                <div className="text-black text-h2">{userInfoData.userNickname}</div>
                <div className="text-gray-600 text-b3_com">{userInfoData.userEmail}</div>
              </>
            )}
          </div>
          <div>
            {!token ? (
              <SecondaryButton size="sm" onClick={loginClickHandler}>
                로그인 하기
              </SecondaryButton>
            ) : (
              <SecondaryButton size="sm" onClick={editClickHandler}>
                프로필 수정
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Hr variant="bold" />
      </div>
      <div className="mt-16">
        <div className="flex flex-col w-full gap-y-12">
          {!token ? (
            <>
              <Title category={101} text1="저장한 팝업" count={0} typography="h3" showArrow={false} />
              <div className="flex justify-center items-center h-[64px] mx-[16px] bg-gray-50 rounded-8">
                <div className="text-center text-gray-600 text-b3">
                  로그인한 뒤 마음에 드는
                  <br />
                  팝업스토어를 저장해 보세요.
                </div>
              </div>
            </>
          ) : (
            <>
              <Title
                category={101}
                text1="저장한 팝업"
                count={queries[0].isLoading ? 0 : queries[0].data?.length}
                typography="h3"
              />
              <PopupSlider variant="smlist" queryKey="getSaveList" queryFn={() => getScrapList(token)} />
            </>
          )}
        </div>
      </div>
      <div className="px-16 mt-20">
        <Hr variant="hairline" />
      </div>
      <div className="mt-20">
        <Title
          category={102}
          text1="작성한 리뷰"
          count={queries[1].isLoading ? 0 : queries[1].data?.length}
          typography="h3"
        />
      </div>
      {/* <div
        className="flex items-center justify-between w-full px-16 mt-20"
        onClick={() => myPopUpStoreClickHandler('offline')}>
        <div className="flex items-center gap-4">
          <span className="text-gray-900 text-h3">내 팝업스토어</span>
        </div>
        <div>
          <ArrowRightSmall />
        </div>
      </div> */}

      <div className="fixed bottom-0 z-50 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Page;
