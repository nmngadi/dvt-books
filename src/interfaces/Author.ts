import { Book } from './Book';

export  interface IAuthor {
href: string;
id: string;
first_name: string;
middle_name: string;
last_name: string;
name: string;
about: string;
Books: Book[];
}
