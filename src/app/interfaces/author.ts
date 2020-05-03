import { booksRef } from './bookRef';
export interface IAuthor {
  href: string;
  id: string;
  first_name: string;
  middle_names: string;
  last_name: string;
  name: string;
  about: string;
  books: typeof booksRef;
}
