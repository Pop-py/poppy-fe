'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  DateLabel,
  getDateDifference,
  Hr,
  IconButton,
  LikeIconButton,
  PrimaryButton,
  SecondaryXSButton,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared';
import { useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useDetailStore } from 'store/detail/detailStore';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import BookSheet from '@/src/widgets/book/BookSheet';
import AddressMap from '@/src/widgets/map/addressMap';
import { formatDay } from '@/src/shared/lib/dateUtils';
import { Sort } from '@/public';
import { SortSheet } from '@/src/shared/ui/bottomsheet/sortSheet';
import { fetchReviews } from '@/src/widgets/detail/api/reviewApi';
import { fetchPopupStoreDetail } from '@/src/widgets/detail/api/popupstoreDetailApi';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';
import { reviewLike } from '@/src/widgets/review/api/reviewLikeApi';
import { fetchScrap } from '@/src/widgets/detail/api/popupstroeScrapApi';
import { operations } from '@/src/shared/lib/operations';
import { fetchPopupStoreSimilar } from '@/src/widgets/detail/api/popupstoreSimilarApi';
import { PopupSlider } from '@/src/widgets';
import { Title } from '@/src/shared';
import { toast } from '@/src/shared/hooks/use-toast';
import { registerUserWaiting } from '@/src/widgets';
import { bell } from '@/public';
import { calculateDaysLeft } from '@/src/shared/lib/calculateDaysLeft';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [sortType, setSortType] = useState<string>('RECENT');
  const [page, setPage] = useState<number>(0);
  const size = 10;
  const { token } = useLoginStore();
  const queryClient = useQueryClient();
  const [waitingDialogOpen, setWaitingDialogOpen] = useState(false);

  const sortOptionsForReviews = [
    { value: 'RECENT', label: '최근 등록순' },
    { value: 'LIKES', label: '좋아요 많은순' },
    { value: 'RATING_HIGH', label: '별점 높은순' },
    { value: 'RATING_LOW', label: '별점 낮은순' },
  ];

  const { recommandData, setRecommandData, selectedTab, setSelectedTab, selectedValue, setSelectedValue } =
    useDetailStore();
  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab('a');
    }
  }, [selectedTab, setSelectedTab]);
  const addressRef = useRef<HTMLParagraphElement>(null);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(prev => !prev);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);
    setPage(0);
  };

  const handleCopy = () => {
    if (addressRef.current) {
      navigator.clipboard.writeText(addressRef.current.textContent || '');
    }
  };

  //리뷰조회데이터
  const { data: reviewData, isLoading: isReviewLoading } = useQuery(
    ['reviews', id, sortType],
    () => fetchReviews(Number(id), sortType, token as string, page, size),
    {
      keepPreviousData: true,
      enabled: !!id,
    },
  );

  //리뷰좋아요
  const { mutate: likeReview } = useMutation(
    ({ reviewId, token }: { reviewId: number; token: string }) => reviewLike(reviewId, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews', id, sortType]);
      },
    },
  );

  const handleLike = (reviewId: number) => {
    if (!token) {
      console.error('로그인이 필요합니다.');
      return;
    }
    likeReview({ reviewId, token });
  };

  //팝업스토어상세데이터(안에 스크랩개수있음음)
  const { data, isLoading: isDetailLoading } = useQuery(
    ['popupStoreDetail', id],
    () => fetchPopupStoreDetail(Number(id), token as string),
    {
      keepPreviousData: true,
    },
  );

  //스크랩
  const { mutate: toggleScrap } = useMutation(
    async () => {
      return await fetchScrap(Number(id), token as string);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['popupStoreDetail', id]);
      },
    },
  );

  const handleScrap = () => {
    toggleScrap();
  };

  const userNickname = useUserInfo(state => {
    if (state.userInfoData) {
      return state.userInfoData.userNickname || 'Guest';
    }
    return 'Guest';
  });

  const isReviewWritten = useMemo(() => {
    if (!reviewData?.content || !userNickname) return false;
    return reviewData.content.some((review: any) => review.userName === userNickname);
  }, [reviewData, userNickname]);

  const daysLeft = calculateDaysLeft(data?.endDate);

  const tabsA = [
    { value: 'a', label: '정보' },
    { value: 'b', label: `리뷰 ${reviewData?.content.length}` },
  ];

  // 더보기 기능을 위한 boolean 배열
  const [lineClamp, setLineClamp] = useState<Array<boolean>>([]);

  useLayoutEffect(() => {
    if (reviewData) {
      setLineClamp(new Array(reviewData.content.length).fill(true));
    }
  }, [reviewData]);

  const handleWaitingButton = () => {
    if (token) {
      registerUserWaiting(+id, token)
        .then(result => {
          setWaitingDialogOpen(true);
        })
        .catch(err => {
          console.log('err:' + err);
        });
    } else {
      toast({
        variant: 'destructive',
        title: '대기 등록 불가',
        description: '로그인 세션이 만료되었습니다.',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* header  */}
        <header className="absolute top-0 left-0 flex w-full px-[16px] justify-between h-[48px] items-center z-10">
          <IconButton className={``} icon={'ic-back-white'} size={'md'} onClick={() => router.back()} />
          <IconButton className={``} icon={'ic-share'} size={'md'} onClick={() => {}} />
        </header>
        {/* content area */}
        <div className="flex flex-col w-full h-full overflow-auto">
          <section className="items-center ">
            {/* img area */}
            <div className="relative h-[400px]">
              {isDetailLoading ? (
                <Skeleton className="w-full h-full rounded-lg" />
              ) : (
                data?.thumbnailUrl && (
                  <Image
                    className="items-center object-cover w-full"
                    layout="fill"
                    src={data.thumbnailUrl}
                    alt="info-img"
                  />
                )
              )}
            </div>

            {/* description */}
            <div className="flex flex-col px-[16px] mb-[48px]">
              {isDetailLoading ? (
                <>
                  <Skeleton className="w-[64px] h-[24px] rounded-lg mt-[12px]" />
                  <Skeleton className="w-[200px] h-[32px] mt-[16px]" />
                  <Skeleton className="w-[150px] h-[20px] mt-[8px]" />
                </>
              ) : (
                <>
                  <DateLabel className="my-[12px] w-[64px] h-[24px]" status="operational" daysLeft={daysLeft ?? 0} />

                  <div className="flex flex-col gap-y-[8px]">
                    <p className="text-black text-h1">{data?.name}</p>
                    <div className="flex items-center">
                      <IconButton className={`ml-[2px]`} icon={'ic-star-active'} size={'smmd'} />
                      <p className="text-gray-900 text-b2 mr-[8px]">{data?.rating}</p>
                      <p className="text-gray-500 text-b3_com">방문자 리뷰 {reviewData?.content.length}</p>
                    </div>
                  </div>
                </>
              )}

              <hr className="mt-[20px] mb-[12px]" />

              <div className="flex flex-col gap-y-[2px]">
                {isDetailLoading ? (
                  <>
                    <Skeleton className="w-1/2 h-[24px] mb-4" />
                    <Skeleton className="w-3/4 h-[24px] mb-4" />
                    <Skeleton className="w-full h-[24px] mb-4" />
                  </>
                ) : (
                  <>
                    <div className="flex gap-x-[8px] h-[24px] items-center">
                      <IconButton icon={'ic-info-date'} size={'sm'} />
                      {data && (
                        <p className="text-gray-800 text-b3_com">
                          {`${formatDay(
                            {
                              year: data.startDate.year,
                              month: data.startDate.month,
                              day: data.startDate.day,
                            },
                            true,
                          )} ~ ${formatDay(
                            {
                              year: data.endDate.year,
                              month: data.endDate.month,
                              day: data.endDate.day,
                            },
                            true,
                          )}`}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-x-[8px] h-[24px] items-center">
                      <IconButton icon={'ic-info-time'} size={'sm'} />
                      <p className="text-gray-800 ">
                        <span className="text-b2">{status === 'operational' ? '영업 중' : '영업 종료'}</span>
                        <span className="text-b3_com">
                          {` · 매일 `}
                          {data?.openingTime?.hour?.toString().padStart(2, '0')}:
                          {data?.openingTime?.minute?.toString().padStart(2, '0')} -
                          {data?.closingTime?.hour?.toString().padStart(2, '0')}:
                          {data?.closingTime?.minute?.toString().padStart(2, '0')}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-x-[8px] h-[24px] items-center">
                      <IconButton icon={'ic-info-location'} size={'sm'} />
                      <p className="text-gray-800 text-b3_com">{data?.address}</p>
                    </div>

                    <div className="flex gap-x-[8px] h-[24px] items-center">
                      <IconButton icon={'ic-info-ticket'} size={'sm'} />
                      <p className="text-gray-800 text-b3_com"> {data?.price?.toLocaleString()} </p>
                    </div>
                    <div className="flex gap-x-[8px] h-[24px] items-center">
                      <IconButton icon={'ic-info-share'} size={'sm'} />
                      {data?.homepageUrl ? (
                        <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                          공식 홈페이지
                        </SecondaryXSButton>
                      ) : (
                        ''
                      )}

                      {data?.instagramUrl ? (
                        <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                          인스타그램
                        </SecondaryXSButton>
                      ) : (
                        ''
                      )}
                      {data?.blogUrl ? (
                        <SecondaryXSButton onClick={() => window.open(data.homepageUrl, '_blank')}>
                          블로그
                        </SecondaryXSButton>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* tab area */}
            <Tabs defaultValue="a" className="w-full" onValueChange={value => setSelectedTab(value)}>
              <TabsList>
                {tabsA.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabsA.map(tab => (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.value === 'a' && (
                    <div className="flex flex-col mb-[64px]">
                      <div className="pt-[24px] px-[18px]">
                        <p className="text-gray-900 text-h4">팝업스토어 소개</p>

                        {data?.description && (
                          <div
                            className="mt-16 text-gray-800 text-b3"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                          />
                        )}
                      </div>

                      <hr className="mt-[40px] mb-[24px]" />

                      {/* map area */}
                      <div className="flex flex-col px-[16px] gap-y-[16px] mb-[70px]">
                        <span className="text-gray-900 text-h4">지도</span>
                        <div className="flex flex-col gap-y-[12px]">
                          {/* 지도 api 수정 */}

                          {data?.address ? <AddressMap address={data.address} /> : <div>로딩중...</div>}
                          <div className="flex gap-x-[4px]">
                            <p ref={addressRef} className="text-gray-900 text-b3_com">
                              {data?.address}
                            </p>
                            <IconButton icon={'ic-info-copy'} size={'sm'} onClick={handleCopy} />
                          </div>
                        </div>
                      </div>
                      {/* pop list */}
                      <div className="flex flex-col w-full gap-y-12">
                        <Title text1="지금 많이 찾는 팝업" showArrow={false} />
                        <PopupSlider
                          variant="list"
                          queryKey={`similarPopup-${id}`}
                          queryFn={() => fetchPopupStoreSimilar(Number(id), token)}
                        />
                      </div>
                    </div>
                  )}

                  {tab.value === 'b' && (
                    <div className="flex flex-col mt-[16px] mb-[62px]">
                      <div className="flex items-center justify-between  px-[16px]">
                        <span className="text-gray-900 text-h2">
                          리뷰 <span className="text-gray-300 ml-[4px]">{reviewData?.content.length}</span>
                        </span>
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

                      {selectedValue === 'visit' && (
                        <div className="flex flex-col gap-y-[20px]">
                          {reviewData?.content && reviewData.content.length > 0 ? (
                            <div className="flex flex-col">
                              {reviewData?.content?.map((review, idx) => (
                                <div key={review.id}>
                                  {/* Rating and Date */}
                                  <div className="flex items-center justify-between mb-[8px] px-[16px] mt-20">
                                    <div className="flex items-center gap-x-8">
                                      <div className="flex items-center">
                                        <IconButton className="mr-[4px]" icon="ic-star-active" size="sm" />
                                        <p className="text-gray-900 text-h1">{review.rating.toFixed(1)}</p>
                                      </div>
                                      <span className="text-gray-600 text-h4">{review.userName}&nbsp;</span>
                                    </div>
                                    <p className="text-gray-300 text-b5">{review.date}</p>
                                  </div>

                                  {/* Image Section */}
                                  {review.imageUrls && review.imageUrls.length > 0 && (
                                    <div className="pl-[16px]">
                                      <div className="flex gap-x-[2px] overflow-auto">
                                        {review.imageUrls.map((imageSrc, index) => (
                                          <Image
                                            key={index}
                                            width={160}
                                            height={160}
                                            src={imageSrc}
                                            alt={`리뷰 이미지 ${index}`}
                                            className="w-[160px] h-[160px] object-cover"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Comment */}
                                  <div className="text-b3 px-[16px]">
                                    <span className={lineClamp[idx] ? 'line-clamp-3' : ''}>{review.content}</span>
                                    {/* 더보기 버튼(line-height를 기준으로 혹은 줄 수를 기준으로 3줄이 넘으면 clamp?) */}
                                    {lineClamp[idx] ? (
                                      <button
                                        onClick={() =>
                                          setLineClamp(prev => {
                                            const arr = [...prev];
                                            arr[idx] = false;
                                            return arr;
                                          })
                                        }
                                        className="block mt-2 text-gray-400 cursor-pointer">
                                        더보기
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          setLineClamp(prev => {
                                            const arr = [...prev];
                                            arr[idx] = true;
                                            return arr;
                                          })
                                        }
                                        className="block mt-2 text-gray-400 cursor-pointer">
                                        간략히
                                      </button>
                                    )}
                                  </div>

                                  {/* Like Button */}
                                  <div className="flex w-full justify-end mt-[24px] px-[16px]">
                                    <LikeIconButton
                                      variant={review.isLiked ? 'active' : 'inactive'}
                                      value={review.likes}
                                      onClick={() => handleLike(review.id)}
                                    />
                                  </div>
                                  <Hr variant="heavy" className="mt-24" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center mt-[50px]">
                              <Image src="/empty/emptyreview.webp" alt="Empty Store" width={200} height={200} />
                              <span className="text-gray-900 text-b1">작성한 리뷰가 없어요.</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {data && (
            <footer className="sticky w-full bottom-0 py-[8px] bg-white flex px-[8px] h-[64px] gap-x-[12px] items-center ">
              <div className="flex items-center flex-col gap-x-[4px]">
                <IconButton
                  className={``}
                  icon={data.isScraped ? 'ic-bookmark-active' : 'ic-bookmark'}
                  size={'md'}
                  onClick={handleScrap}
                />
                <p className="text-gray-400 text-c1">{data.scrapCount}</p>
              </div>
              {selectedTab === 'a' && data.reservationType === 'OFFLINE' ? (
                <PrimaryButton variant="enabled" onClick={handleWaitingButton}>
                  대기하기
                </PrimaryButton>
              ) : selectedTab === 'a' && data.reservationType === 'ONLINE' ? (
                <PrimaryButton variant="enabled" onClick={toggleBottomSheet}>
                  예약하기
                </PrimaryButton>
              ) : selectedTab === 'b' && isReviewWritten ? (
                <PrimaryButton variant="disabled">작성 완료</PrimaryButton>
              ) : (
                <PrimaryButton
                  variant="enabled"
                  onClick={() => {
                    router.push(`/review/${id}`);
                  }}>
                  리뷰 남기기
                </PrimaryButton>
              )}
              <BookSheet
                isBottomSheetOpen={isBottomSheetOpen}
                setIsBottomSheetOpen={setIsBottomSheetOpen}
                popupId={data.id}
                openingTime={data.openingTime}
                closingTime={data.closingTime}
                price={data.price}
                storeName={data.name}
                address={data.address}
              />
            </footer>
          )}
        </div>

        <SortSheet
          isOpen={isSortSheetOpen}
          onClose={() => setIsSortSheetOpen(false)}
          sortType={sortType}
          onSortChange={handleSortChange}
          sortOptions={sortOptionsForReviews}
        />
        <AlertDialog open={waitingDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>등록 완료</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col items-center gap-x-8">
                <Image src={bell} width={120} height={120} alt="registration complete" />
                <span className="text-gray-700 text-b3">대기 등록이 완료되었습니다.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel text="확인" onClick={() => setWaitingDialogOpen(false)} />
              <AlertDialogAction
                variant="informative"
                text="내역으로 이동"
                onClick={() => {
                  setWaitingDialogOpen(false);
                  router.push('/book');
                }}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
