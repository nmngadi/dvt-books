import { IBook } from './books';
export interface IAuthor {
  href: string;
  id: string;
  first_name: string;
  middle_names: string;
  last_name: string;
  name: string;
  about: string;
  books: {
    href: string;
    id: string;
    isbn13: string;
  }[];
}
