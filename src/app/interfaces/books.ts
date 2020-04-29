import { ITag } from './tag';

export interface IBook {

  isbn13: string;
  title: string;
  about: string;
  abstract: string;
  author: {
    href: string;
    id: string;
    name: string;
  };
  publisher: string;
  date_published: string;
  image: string;
  tags: ITag[];
}
