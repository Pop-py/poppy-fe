export interface PopupCarouselResponse extends Error {
  message: string;
  data?: Array<PopupCarouselItem>;
}

export interface PopupCarouselItem {
  img: string;
  location: string;
  day: string;
  deadLine: number;
  isCount: boolean;
  id: number;
  number: string;
  thumbnail: string;
  title: string;
  message: string;
}

export interface PopupList extends Error {
  message: string;
  data?: Array<PopupListItem>;
}

export interface PopupListItem {
  id: number;
  scrapId: number;
  name: string;
  description: string;
  location: string;
  address: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  openingTime: {
    hour: number;
    minute: number;
  };
  closingTime: {
    hour: number;
    minute: number;
  };
  availableSlot: number;
  isActive: boolean;
  isEnd: boolean;
  rating: number;
  categoryName: string;
  reservationType: string;
  thumbnailUrl: string;
  imageUrls: Array<string>;
  price: number;
  homepageUrl: string;
  instagramUrl: string;
  blogUrl: string;
  scrapCount: number;
  isAlmostFull: boolean;
  thumbnail: string;
}

export interface ScrapListItem {
  popupStoreId: number;
  popupStoreName: string;
  location: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  isAlmostFull: boolean;
}

export interface Error {
  code: number;
  httpStatus?: string;
  errorMessage?: string;
}
