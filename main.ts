import { updateBook, Book } from './book';

async function main(): Promise<void> {
    const sampleBook: Book = {
        book_id: 3,
        title: 'Updated Sample Book',
        genre: 'Non-Fiction',
        publish_date: new Date('2023-06-01'),
        author_id: 1,
        publisher_id: 1,
        format: 'Paperback',
        price: 14.99
    };

    try {
        await updateBook(sampleBook);
    } catch (error) {
        console.error('Error updating book:', error);
    }
}

main();

