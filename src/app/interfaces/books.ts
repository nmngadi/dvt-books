export interface IBook {
  isbN10: string;
  isbn13: string;
  title: string;
  about: string;
  abstract: string;
  AuthorId: 3;
  author: {
  href: string,
  id: string,
    name: string
  };
  publisher: string;
  date_published: string;
  image: string;
  tags: { id: string; href: string; description: string; }[];
}
