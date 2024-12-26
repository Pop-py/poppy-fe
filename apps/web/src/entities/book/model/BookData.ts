export interface BookListItem {
  thumbnail: string;
  userId: number;
  storeId: number;
  popupStoreName: string;
  reservationStatus: number;
  reservationDate: string;
  reservationTime: string;
  location: string;
  person: number;
  status: string;
}

export interface ChipItem {
  id: number;
  label: string;
}

export interface ActivityListItem {
  userId: number;
  type: string;
  storeId: number;
  popupStoreName: string;
  waitingNumber: number;
  peopleAhead?: number | null;
  isRead: false;
  date?: string;
  message: string;
}