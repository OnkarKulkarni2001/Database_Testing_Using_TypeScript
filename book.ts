import { Client } from 'pg';

export interface Book {
    book_id: number;
    title: string;
    genre: string;
    publish_date: Date;
    author_id: number;
    publisher_id: number;
    format: string;
    price: number;
}

export async function updateBook(book: Book): Promise<void> {
    const client = new Client({
        user: 'postgres',
        host: '172.18.0.3',
        database: 'online_bookstore',
        password: 'password',
        port: 5432,
    });

    await client.connect();

    const query = `
        UPDATE Books
        SET title = $1, genre = $2, publish_date = $3, author_id = $4, publisher_id = $5, format = $6, price = $7
        WHERE book_id = $8
    `;
    const values = [book.title, book.genre, book.publish_date, book.author_id, book.publisher_id, book.format, book.price, book.book_id];

    try {
        console.log('Executing query:', query);
        console.log('With values:', values);

        const res = await client.query(query, values);
        console.log('Book updated successfully', res.rowCount); // Add rowCount for debugging
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error updating book', (err as Error).stack); // Type assertion
        } else {
            console.error('Unexpected error', err);
        }
    } finally {
        await client.end();
    }
}
