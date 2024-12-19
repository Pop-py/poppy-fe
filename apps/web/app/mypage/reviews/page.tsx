import { IconButton, LikeIconButton } from '@/src/shared';
import { ChevronHeader } from '@/src/widgets';
import React from 'react';
import Image from 'next/image';
import { Sort } from '@/public';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-white">
        <ChevronHeader title="작성한 리뷰" edit={false} />
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
        <div className="flex flex-col gap-y-[52px]">
          {reviewData.map(review => (
            <div key={review.id}>
              {/* Popup information */}
              <div className="px-16 flex justify-between items-center">
                <div className="flex gap-x-8">
                  <div>
                    <Image
                      width={40}
                      height={40}
                      src={'https://placehold.co/500/webp'}
                      alt={`review-${review.id}`}
                      className="object-cover rounded-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="text-b5 text-gray-400">{review.popupAddress}</div>
                    <div className="text-h4 text-gray-900">{review.popupName}</div>
                  </div>
                </div>
                <div>
                  <IconButton icon="kebab" />
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
              <div>
                <div className="flex gap-x-[2px] overflow-auto">
                  {review.images.map((imageSrc, index, arr) => (
                    <Image
                      key={index}
                      width={160}
                      height={160}
                      src={imageSrc}
                      alt={`review-${index}`}
                      className={`w-[160px] h-[160px] object-cover ${index === 0 ? 'pl-16' : null} ${index + 1 === arr.length ? 'pr-16' : null}`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="text-b3 px-[16px] mt-8">
                <span className="text-gray-900">{review.username} &nbsp;</span>
                <span className="text-gray-800">{review.comment}</span>
              </div>

              {/* Like Button */}
              <div className="flex w-full justify-end mt-[4px] px-[16px]">
                <LikeIconButton variant="inactive" value={review.likes} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-bottomMargin" />
      </div>
    </div>
  );
};

export default Page;

const reviewData = [
  {
    id: 1,
    popupName: '오둥이의 아르바이트',
    popupAddress: '서울 서초구',
    rating: 4.0,
    date: '24.10.19',
    images: [
      '/images/img-review-1.png',
      '/images/img-review-2.png',
      '/images/img-review-3.png',
      '/images/img-review-3.png',
    ],
    username: 'leechunsik',
    comment:
      '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
    likes: 1,
  },
  {
    id: 2,
    popupName: '오둥이의 아르바이트',
    popupAddress: '서울 서초구',
    rating: 4.0,
    date: '24.10.19',
    images: [
      '/images/img-review-1.png',
      '/images/img-review-2.png',
      '/images/img-review-3.png',
      '/images/img-review-3.png',
    ],
    username: 'leechunsik',
    comment:
      '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
    likes: 1,
  },
  {
    id: 3,
    popupName: '오둥이의 아르바이트',
    popupAddress: '서울 서초구',
    rating: 4.0,
    date: '24.10.19',
    images: [
      '/images/img-review-1.png',
      '/images/img-review-2.png',
      '/images/img-review-3.png',
      '/images/img-review-3.png',
    ],
    username: 'leechunsik',
    comment:
      '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
    likes: 1,
  },
  {
    id: 4,
    popupName: '오둥이의 아르바이트',
    popupAddress: '서울 서초구',
    rating: 4.0,
    date: '24.10.19',
    images: [
      '/images/img-review-1.png',
      '/images/img-review-2.png',
      '/images/img-review-3.png',
      '/images/img-review-3.png',
    ],
    username: 'leechunsik',
    comment:
      '처음 방문해 봤는데 생각보다 만족스러웠어요. 공간 디자인도 깔끔하고, 제품 체험할 수 있는 부분이 특히 좋았어요. 다만 사람이 좀 많아서 한두 곳은 dsf 만족스러웠 만족스러',
    likes: 1,
  },
];
