export interface IProduct {
  _id: string;
  category: string;
  imageSrc: string;
  isPopular: boolean;
  label: string;
  price: number;
  productName: string;
  registration: {
    startDate: number;
    endDate: number;
  };
  startCourse: number;
}

export interface IProductFetchParams {
  category: string;
}

export interface IProductFetchBody {
  ids: string[];
  info?: boolean;
}
