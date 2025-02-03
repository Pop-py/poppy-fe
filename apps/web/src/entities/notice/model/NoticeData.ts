export interface NoticeListItem {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  createdTime: string;
}

export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdDate: string;
}

export interface ActivityListItem {
  isRead: boolean;
  message: string;
  noticeDate: string;
  noticeTime: string;
  popupStoreId: number;
  popupStoreName: string;
  type: string;
  userId: number;
}
