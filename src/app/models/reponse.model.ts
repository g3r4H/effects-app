export interface IResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T | T[];
  support: {
    url: string;
    text: string;
  };
}
