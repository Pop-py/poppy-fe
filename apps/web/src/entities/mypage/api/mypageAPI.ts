import { PopupListItem } from '@/src/widgets';
import { ReviewListItem } from '..';

export const getScrapList = async (token: string): Promise<Array<PopupListItem>> => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/scraps?sortType=RECENT_SAVED`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

// 닉네임 변경
export const changeNickName = async (id: number, newNickname: string, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ nickname: newNickname }),
    });

    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 회원탈퇴
export const deleteUser = async (token: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/bye`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getReviewList = async (token: string): Promise<Array<ReviewListItem>> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/review`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const deleteReview = async (reviewId: number, token: string): Promise<boolean> => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reviews/${reviewId}`, options);
    const result = await response.json();

    if (result.code === 200) {
      return true;
    }

    return false;
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
