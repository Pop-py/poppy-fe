// import { PopupCarouselItem, PopupCarouselResponse, PopupListItem } from '../model/';

export const getOnetimeToken = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/oauth2/authorization/naver`);
    const result = await res.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getLoginToken = async (code: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/token?code=${code}`);
    const result = await response.json();

    if (result && result.data) {
      return result;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const patchNickName = async (inputValue: string, code: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/initial?code=${code}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: inputValue }),
    });

    const result = await res.json();

    if (res.ok && result.code === 200) {
      return result;
    }

    // Handle API error case
    throw new Error(result.errorMessage || 'An unknown error occurred.');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const saveFCMToken = async (fcmToken: string, userId: number, accessToken: string): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${userId}/fcm-token`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ fcmToken: fcmToken }),
    });

    const result = await res.json();

    if (result.code === 200) {
      return true;
    }

    // Handle API error case
    throw new Error(result.errorMessage || 'An unknown error occurred.');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
