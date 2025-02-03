import { ActivityListItem, NoticeDetail, NoticeListItem } from '..';

export const getNotices = async (): Promise<Array<NoticeListItem>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/notices`);
    const result = await response.json();

    if (result && result.data) {
      return result.data;
    }

    if (result.code === 404) {
      return [];
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};

export const getNoticeDetail = async (id: string): Promise<NoticeDetail> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/notices/${id}`);
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

export const getActivityNotices = async (userId: number, token: string): Promise<Array<ActivityListItem>> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJub2VsNzE0NUBnbWFpbC5jb20iLCJ1c2VySWQiOjUsInVzZXJuYW1lIjoibm9lbDcxNDVAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTczODQ3NDY4NCwiZXhwIjoxNzM4NDc2NDg0fQ.IkN2dLFtf1IzVa0dj_9KhvT1a5IYffPbkfiidMI7BPbtUjYIPNA13LtZ9w8NJqDG',
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/users/${5}/notifications`, options);
    const result = await response.json();

    console.log(result.data);

    if (result && result.data) {
      return result.data;
    }

    throw new Error('Response does not contain a data field');
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch data');
  }
};
