export interface Review {
  id: number;
  content: string;
  date: string;
  imageUrls: string[];
  likes: number;
  popupStoreName: string;
  rating: number;
  userName: string;
}

// 리뷰 데이터 타입 정의
export interface ReviewData {
  content: Review[];
  metadata: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  };
}

export const fetchReviews = async (id: number, sortType: string, page?: number, size?: number): Promise<ReviewData> => {
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/store/${id}?sortType=${sortType}&page=${page}&size=${size}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('리뷰 데이터를 가져오는 데 실패했습니다.');
  }

  const data = await response.json();
  return data.data; // ReviewData 타입에 맞는 데이터를 반환
};