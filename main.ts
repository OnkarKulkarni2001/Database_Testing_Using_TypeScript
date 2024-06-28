import { updateBook, Book } from './book';

const sampleBook: Book = {
    book_id: 2,
    title: 'Updated Sample Book',
    genre: 'Non-Fiction',
    publish_date: new Date('2023-06-01'),
    author_id: 1,
    publisher_id: 1,
    format: 'Paperback',
    price: 14.99
};

updateBook(sampleBook).catch(console.error);

