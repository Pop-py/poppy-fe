import { PopupListItem } from '@/src/widgets';

export const getSearchHistory = async (accessToken: string): Promise<Array<string>> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/search-history`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getTop10Searches = async (): Promise<Array<string>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/search-history/popular`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const getRecent10Popups = async (accessToken?: string): Promise<Array<PopupListItem>> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/recent`, options);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    if (result.code !== 200) {
      return [];
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};

export const deleteSearchHistory = async (keyword: string, accessToken: string): Promise<boolean> => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/search-history/${keyword}`, options);
    const result = await response.json();

    if (result && result.code) {
      if (result.code === 200) {
        return true;
      } else {
        return false;
      }
    }

    throw new Error('Response does not contain a code field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};

export const deleteAllSearchHistories = async (accessToken: string): Promise<boolean> => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/search-history`, options);
    const result = await response.json();

    if (result && result.code) {
      if (result.code === 200) {
        return true;
      } else {
        return false;
      }
    }

    throw new Error('Response does not contain a code field');
  } catch (e) {
    throw new Error('Failed to fetch data');
  }
};
