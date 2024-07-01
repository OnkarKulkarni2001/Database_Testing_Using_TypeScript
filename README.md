# Midterm_Database_Testing
Midterm of Database Testing

## Team Duties
Database schema design and initial data insertion - Onkar Parag Kulkarni (8973145) 

Typescript interface and CRUD operations -Kaushik Tadhani (8955406)

Database integration testing - Michael Lannigan (8981339)

## Tables & Attributes required
**Table Name - Authors**

| Attributes | Types |
| -----------| ----- |
| author_id | INTEGER(PK) |
| name | VARCHAR |
| bio | TEXT |
| birth_date | DATE |

**Table Name - Publishers**

| Attributes | Types |
| ---------- | ----- |
| publisher_id | INTEGER(PK) |
| name | VARCHAR |
| address | VARCHAR |
| contact_email | VARCHAR |

**Table Name - Books**

| Attributes | Types |
| ---------- | ----- |
| book_id | INTEGER(PK) |
| title | VARCHAR |
| genre | VARCHAR |
| publish_date | DATE |
| author_id | INTEGER(FK) |
| publisher_id | INTEGER(FK) |
| format | VARCHAR |
| price | DECIMAL |

**Table Name - Customers**

| Attributes | Types |
| ---------- | ----- |
| customer_id | INTEGER(PK) |
| name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| join_date | DATE |

**Table Name - Orders**

| Attributes | Types |
| ---------- | ----- |
| order_id | INTEGER(PK) |
| customer_id | INTEGER(FK) |
| order_date | DATE |
| total_amount | DECIMAL |

**Table Name - OrderItems**

| Attributes | Types |
| ---------- | ----- |
| order_item_id | INTEGER(PK) |
| order_id | INTEGER(FK) |
| book_id | INTEGER(FK) |
| quantity | INTEGER |
| unit_price | DECIMAL |

**Table Name - Reviews**
| Attributes | Types |
| ---------- | ----- |
| review_id | INTEGER(PK) |
| book_id | INTEGER(FK) |
| customer_id | INTEGER(FK) |
| review_date | DATE |
| rating | INTEGER |
| comment | TEXT |




## Table Creation Query
```
CREATE DATABASE online_bookstore

-- Create author table
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    birth_date DATE
);
```
-- create customer table
```
CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    join_date DATE
);
```
-- create publisher table
```
CREATE TABLE Publishers (
    publisher_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    contact_email VARCHAR(255)
);
```
-- create book table
```
CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    publish_date DATE,
    author_id INTEGER REFERENCES Authors(author_id),
    publisher_id INTEGER REFERENCES Publishers(publisher_id),
    format VARCHAR(50),
    price DECIMAL(10, 2)
);
```
-- create orders table
```
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customers(customer_id),
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```
-- create order item table
```
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(order_id),
    book_id INTEGER REFERENCES Books(book_id),
    quantity INTEGER,
    unit_price DECIMAL(10, 2)
);
```
-- create review table 
```
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES Books(book_id),
    customer_id INTEGER REFERENCES Customers(customer_id),
    review_date DATE,
    rating INTEGER,
    comment TEXT
);
```


-- Insert data into Authors
```
INSERT INTO Authors (name, bio, birth_date)
VALUES
    ('J.K. Rowling', 'Author of the Harry Potter series', '1965-07-31'),
    ('George R.R. Martin', 'Author of A Song of Ice and Fire', '1948-09-20'),
    ('J.R.R. Tolkien', 'Author of The Lord of the Rings', '1892-01-03'),
    ('Stephen King', 'Author of horror and supernatural fiction', '1947-09-21'),
    ('Brandon Sanderson', 'Author of the Mistborn series', '1975-12-19'),
    ('Neil Gaiman', 'Author of American Gods', '1960-11-10'),
    ('Rick Riordan', 'Author of Percy Jackson series', '1964-06-05'),
    ('Suzanne Collins', 'Author of The Hunger Games', '1962-08-10'),
    ('Agatha Christie', 'Queen of Mystery', '1890-09-15'),
    ('Dan Brown', 'Author of The Da Vinci Code', '1964-06-22');
```

-- Insert data into Customers
```
INSERT INTO Customers (name, email, phone, join_date)
VALUES
    ('Alice Johnson', 'alice.johnson@gmail.com', '555-1234', '2023-01-15'),
    ('Bob Smith', 'bob.smith@gmail.com', '555-5678', '2023-02-20'),
    ('Charlie Brown', 'charlie.brown@outlook.com', '555-8765', '2023-03-10'),
    ('David Miller', 'david.miller@yahoo.com', '555-4321', '2023-04-11'),
    ('Eve Adams', 'eve.adams@gmail.com', '555-8764', '2023-05-12'),
    ('Frank Wright', 'frank.wright@gmail.com', '555-0987', '2023-06-13'),
    ('Grace Lee', 'grace.lee@gmail.com', '555-6543', '2023-07-14'),
    ('Hank Green', 'hank.green@gmail.com', '555-3210', '2023-08-15'),
    ('Ivy Collins', 'ivy.collins@gmail.com', '555-2109', '2023-09-16'),
    ('Jack White', 'jack.white@gmail.com', '555-1098', '2023-10-17');
```

-- Insert data into publisher table
```
INSERT INTO Publishers (name, address, contact_email)
VALUES
    ('Penguin Books', '375 Hudson Street, New York, NY 10014', 'contact@penguinbooks.com'),
    ('HarperCollins', '195 Broadway, New York, NY 10007', 'info@harpercollins.com'),
    ('Random House', '1745 Broadway, New York, NY 10019', 'support@randomhouse.com'),
    ('Simon & Schuster', '1230 Avenue of the Americas, New York, NY 10020', 'contact@simonandschuster.com'),
    ('Macmillan Publishers', '120 Broadway, New York, NY 10271', 'info@macmillan.com'),
    ('Hachette Book Group', '1290 Avenue of the Americas, New York, NY 10104', 'contact@hachettebookgroup.com'),
    ('Scholastic', '557 Broadway, New York, NY 10012', 'info@scholastic.com'),
    ('Oxford University Press', '198 Madison Avenue, New York, NY 10016', 'contact@oup.com'),
    ('Wiley', '111 River Street, Hoboken, NJ 07030', 'info@wiley.com'),
    ('Springer', '233 Spring Street, New York, NY 10013', 'support@springer.com');
```

-- Insert data into Books
```
INSERT INTO Books (title, genre, publish_date, author_id, publisher_id, format, price)
VALUES
    ('Harry Potter and the Philosopher''s Stone', 'Fantasy', '2023-06-26', 1, 1, 'Hardcover', 19.99),
    ('Harry Potter and the Chamber of Secrets', 'Fantasy', '2023-07-31', 1, 1, 'Hardcover', 21.99),
    ('A Game of Thrones', 'Fantasy', '2023-08-06', 2, 2, 'Paperback', 9.99),
    ('A Clash of Kings', 'Fantasy', '2023-08-06', 2, 2, 'Paperback', 10.99),
    ('The Hobbit', 'Fantasy', '2023-09-21', 3, 3, 'Hardcover', 14.99),
    ('The Shining', 'Horror', '2023-01-28', 4, 4, 'Hardcover', 18.99),
    ('Mistborn: The Final Empire', 'Fantasy', '2023-11-15', 5, 5, 'Paperback', 12.99),
    ('American Gods', 'Fantasy', '2023-05-01', 6, 6, 'Hardcover', 17.99),
    ('Percy Jackson & The Olympians: The Lightning Thief', 'Fantasy', '2023-06-28', 7, 7, 'Paperback', 11.99),
    ('The Hunger Games', 'Dystopian', '2023-04-14', 8, 8, 'Paperback', 14.99);
```

-- insert data into orders table
```
INSERT INTO Orders (customer_id, order_date, total_amount)
VALUES
    (5, '2024-06-20', 109.98),
    (6, '2024-06-21', 119.99),
    (7, '2024-06-22', 134.98),
    (8, '2024-06-23', 178.99),
    (9, '2024-06-24', 232.98),
    (10, '2024-06-25', 132.99),
    (11, '2024-06-26', 158.99),
    (12, '2024-06-27', 114.99),
    (13, '2024-06-28', 125.99),
    (14, '2024-06-29', 155.99);
```

-- Insert data into OrderItems
```
INSERT INTO OrderItems (order_id, book_id, quantity, unit_price)
VALUES
    (11, 1, 1, 19.99),
    (12, 6, 1, 18.99),
    (13, 1, 2, 19.99),
    (14, 5, 3, 14.99),
    (15, 10, 4, 14.99),
    (16, 1, 3, 19.99),
    (17, 5, 2, 14.99),
    (18, 9, 3, 11.99),
    (19, 5, 2, 14.99),
    (20, 6, 2, 18.99);
```

-- insert customer review data
```
INSERT INTO Reviews (book_id, customer_id, review_date, rating, comment)
VALUES
    (1, 5, '2024-06-25', 5, 'Amazing book! Loved it.'),
    (2, 6, '2024-06-26', 4, 'Great story, but a bit slow in the middle.'),
    (3, 7, '2024-06-27', 5, 'A classic. Must read for everyone.'),
    (4, 8, '2024-06-28', 3, 'Good, but not my favorite.'),
    (5, 9, '2024-06-29', 4, 'Interesting and engaging.'),
    (6, 10, '2024-06-30', 5, 'Could not put it down!'),
    (7, 11, '2024-07-01', 4, 'Well-written and thought-provoking.'),
    (8, 12, '2024-07-02', 3, 'It was okay, but I expected more.'),
    (9, 13, '2024-07-03', 5, 'Brilliant storytelling.'),
    (10, 14, '2024-07-04', 4, 'Very enjoyable read.'),
    (1, 5, '2024-07-05', 5, 'Fantastic read, highly recommend!'),
    (2, 6, '2024-07-06', 4, 'Enjoyed it a lot.'),
    (3, 7, '2024-07-07', 5, 'Timeless and beautiful.'),
    (4, 8, '2024-07-08', 3, 'It was alright.'),
    (5, 9, '2024-07-09', 4, 'Captivating from start to finish.');
```
-- Power writers (authors) with more than 1 books in the same genre published within the last 1 years 
```
SELECT a.author_id, a.name, a.bio, b.genre, COUNT(*) AS book_count
FROM Authors a
JOIN Books b ON a.author_id = b.author_id
WHERE b.publish_date >= NOW() - INTERVAL '1 years'
GROUP BY a.author_id, a.name, a.bio, b.genre
HAVING COUNT(*) > 1;
```

-- Loyal Customers who has spent more than 120 dollars in the last year
```
SELECT c.customer_id, c.name, c.email, c.phone, c.join_date, SUM(o.total_amount) AS total_spent
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= NOW() - INTERVAL '1 year'
GROUP BY c.customer_id
HAVING SUM(o.total_amount) > 120;
```

-- Well Reviewed books that has a better user rating than average
```
SELECT b.book_id, b.title, b.genre, b.publish_date, a.name AS author_name, b.format, b.price, AVG(r.rating)
FROM Books b
JOIN Authors a ON b.author_id = a.author_id
JOIN Reviews r ON b.book_id = r.book_id
GROUP BY b.book_id, a.name
HAVING AVG(r.rating) > (SELECT AVG(rating) FROM Reviews);
```

-- The most popular genre by sales
```
SELECT b.genre, SUM(oi.quantity) AS total_sales
FROM Books b
JOIN OrderItems oi ON b.book_id = oi.book_id
GROUP BY b.genre
ORDER BY total_sales DESC;
```

-- The 10 most recent posted reviews by Customers 
```
SELECT c.customer_id, c.name AS customer_name, b.title AS book_title, r.review_date, r.rating, r.comment
FROM Reviews r
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Books b ON r.book_id = b.book_id
ORDER BY r.review_date DESC
LIMIT 10;

```

