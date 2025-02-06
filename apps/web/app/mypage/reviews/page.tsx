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
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  Hr,
  IconButton,
  LikeIconButton,
  Skeleton,
} from '@/src/shared';
import { ChevronHeader, fetchPopupStoreDetail } from '@/src/widgets';
import React from 'react';
import Image from 'next/legacy/image';
import { Sort } from '@/public';
import { useLoginStore } from 'store/login/loginStore';
import { useQueries, useQuery } from 'react-query';
import { deleteReview, getReviewList } from '@/src/entities';
import { StarActive } from '@/public';
import { toast } from '@/src/shared/hooks/use-toast';

const Page = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { token } = useLoginStore();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const selectedReviewId = React.useRef<number>(0);

  const { data, isLoading } = useQuery(['getReviewList', token], () => getReviewList(token!), { enabled: !!token });

  const handleDeleteReview = async () => {
    if (token) {
      await deleteReview(selectedReviewId.current, token).then(result => {
        if (result) {
          toast({
            variant: 'default',
            title: '리뷰 삭제 완료',
            description: '해당 리뷰를 삭제했습니다.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: '리뷰 삭제 실패',
            description: '리뷰 삭제에 실패했습니다.',
          });
        }
      });
    } else {
      toast({
        variant: 'destructive',
        title: '리뷰 삭제 실패',
        description: '로그인 세션이 만료되었습니다.',
      });
    }
    setIsBottomSheetOpen(false);
  };

  if (!isClient) return <div></div>;

  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-white">
        <ChevronHeader title="작성한 리뷰" edit={false} />
      </div>
      <div className="overflow-y-auto">
        <div className="flex justify-end px-16 mt-4">
          <div className="flex">
            <span>
              <Sort />
            </span>
            <span className="ml-4 text-gray-500 text-b2">최근 등록순</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-[20px] mt-16">
          {isLoading
            ? Array.from({ length: 5 }, (_, idx) => (
                <div className="flex flex-col mt-16 gap-y-8" key={`SKELETON_${idx}`}>
                  <div className="flex px-16 gap-x-8">
                    <div>
                      <Skeleton className="w-40 h-40" />
                    </div>
                    <div className="flex flex-col justify-around">
                      <div>
                        <Skeleton className="h-16 w-[100px]" />
                      </div>
                      <div>
                        <Skeleton className="h-20 w-[250px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-16">
                    <div className="flex items-center">
                      <StarActive />
                      <Skeleton className="h-20 w-[40px]" />
                    </div>
                    <div>
                      <Skeleton className="h-16 w-[100px]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-8">
                    <div className="flex overflow-x-auto gap-x-2">
                      <div>
                        <Skeleton className="h-[160px] w-[160px] ml-16" />
                      </div>
                      <div>
                        <Skeleton className="h-[160px] w-[160px]" />
                      </div>
                      <div>
                        <Skeleton className="h-[160px] w-[160px]" />
                      </div>
                      <div>
                        <Skeleton className="h-[160px] w-[160px]" />
                      </div>
                      <div>
                        <Skeleton className="h-[160px] w-[160px] mr-16" />
                      </div>
                    </div>
                    <div className="px-16">
                      <Skeleton className="w-full h-40" />
                    </div>
                  </div>
                  <div className="flex w-full justify-end mt-[4px] px-[16px]">
                    <LikeIconButton variant="inactive" value={0} />
                  </div>
                  <Hr variant="hairline" className="my-24" />
                </div>
              ))
            : data?.map(review => (
                <div key={review.id} className="mr-16">
                  {/* Popup information */}
                  <div className="flex items-center justify-between px-16 ">
                    <div className="flex gap-x-8">
                      <div>
                        <Image
                          width={40}
                          height={40}
                          src={review.thumbnailUrl}
                          alt={`review-${review.id}`}
                          className="object-cover rounded-2"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        {/* <div className="text-gray-400 text-b5">{review.popupAddress}</div> */}
                        <div className="text-gray-400 text-b5">{review.location}</div>
                        <div className="text-gray-900 text-h4">{review.popupStoreName}</div>
                      </div>
                    </div>
                    <div>
                      <IconButton
                        icon="kebab"
                        onClick={() => {
                          selectedReviewId.current = review.id;
                          setIsBottomSheetOpen(true);
                        }}
                      />
                    </div>
                  </div>
                  {/* Rating and Date */}
                  <div className="flex items-center justify-between my-[8px] px-[16px]">
                    <div className="flex items-center">
                      <IconButton className="mr-[4px]" icon="ic-star-active" size="sm" />
                      <p className="text-gray-900 text-h4">{review.rating.toFixed(1)}</p>
                    </div>
                    <p className="text-gray-300 text-b5">{review.date}</p>
                  </div>

                  {/* Image Section */}
                  <div className="overflow-x-auto">
                    <div className="flex gap-x-[2px]">
                      {review.imageUrls.map((imageSrc, index, arr) => (
                        <div
                          key={`RVIMG_${index}`}
                          className={`relative h-[160px] w-[160px] flex-shrink-0 ${index === 0 ? 'ml-16' : ''} ${index + 1 === arr.length ? 'mr-16' : ''}`}>
                          <Image layout="fill" src={imageSrc} alt={`review-${index}`} className={`object-cover`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="text-b3 px-[16px] mt-8">
                    <span className="text-gray-800">{review.content}</span>
                  </div>

                  {/* Like Button */}
                  <div className="flex w-full justify-end mt-[4px] px-[16px]">
                    <LikeIconButton variant="inactive" value={review.likes} />
                  </div>
                  <Hr variant="hairline" className="my-24" />
                </div>
              ))}
        </div>
        <div className="mt-bottomMargin" />
      </div>
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheetContent aria-describedby="bottomSheetContent" className="px-0">
          <BottomSheetHeader className="py-16 border-b border-gray-100">
            <BottomSheetTitle>리뷰</BottomSheetTitle>
          </BottomSheetHeader>
          <div className="flex flex-col">
            <div className="flex items-center h-48 ml-16 text-gray-800 text-b1">수정하기</div>
            <div className="flex items-center h-48 ml-16 text-gray-800 text-b1" onClick={() => setIsDialogOpen(true)}>
              삭제하기
            </div>
          </div>
        </BottomSheetContent>
      </BottomSheet>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>리뷰 삭제</AlertDialogTitle>
            <AlertDialogDescription>선택한 리뷰를 삭제하시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel />
            <AlertDialogAction variant="warning" onClick={() => handleDeleteReview()} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
