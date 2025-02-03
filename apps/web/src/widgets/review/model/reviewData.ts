export interface ReviewListItem {
  id: number;
  content: string;
  imageUrls: string[];
  imageIds: number[];
  rating: number;
  likes: number;
  userName: string;
  popupStoreId: number;
  popupStoreName: string;
  date: string;
  isLiked: boolean | null;
}
