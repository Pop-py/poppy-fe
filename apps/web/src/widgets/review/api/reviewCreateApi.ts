import { ReviewListItem } from '../model';

export const createReview = async (
  popupStoreId: number,
  formData: FormData,
  accessToken: string, // 액세스 토큰을 매개변수로 추가
): Promise<any> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData, // form-data로 전달
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${popupStoreId}`, options);

    if (!response.ok) {
      throw new Error('리뷰 작성에 실패했습니다.');
    }

    return await response.json();
  } catch (e) {
    throw new Error('Failed to create review: ' + (e instanceof Error ? e.message : 'Unknown error'));
  }
};

export const updateReview = async (
  reviewId: number,
  formData: FormData,
  accessToken: string, // 액세스 토큰을 매개변수로 추가
): Promise<any> => {
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData, // form-data로 전달
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${reviewId}`, options);

    if (!response.ok) {
      throw new Error('리뷰 작성에 실패했습니다.');
    }

    return await response.json();
  } catch (e) {
    throw new Error('Failed to create review: ' + (e instanceof Error ? e.message : 'Unknown error'));
  }
};

export const getReview = async (id: number, accessToken: string): Promise<ReviewListItem> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${id}`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};
