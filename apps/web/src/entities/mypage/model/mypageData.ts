export interface ReviewListItem {
  id: number;
  content: string;
  imageUrls: Array<string>;
  rating: number;
  likes: number;
  userName: string;
  popupStoreId: number;
  popupStoreName: string;
  date: string;
}
