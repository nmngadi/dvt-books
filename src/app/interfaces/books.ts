import { ITag } from './tag';
import { authorRef } from './authorRef';

export interface IBook {
  isbn10: string;
  isbn13: string;
  title: string;
  about: string;
  abstract: string;
  author: typeof authorRef;
  publisher: string;
  date_published: string;
  image: string;
  tags: ITag[];
}
