export type FormData = {
  date: Date | undefined;
  time: string;
  visitors: number;
};

export type Selectable = {
  time: boolean;
  visitors: boolean;
  book: boolean;
};

export type Select = {
  date: (date: Date | undefined) => void;
  time: (time: string) => void;
  visitors: (visitors: number) => void;
};

export type SheetType = {
  title: string;
  period: string;
  rating: number;
  visitorReview: number;
  instaReview: number;
};
