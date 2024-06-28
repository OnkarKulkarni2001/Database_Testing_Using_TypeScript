# Midterm_Database_Testing
Midterm of Database Testing

## Team Duties
Onkar Parag Kulkarni (8973145) 

Kaushik Tadhani ()

Michael Lannigan ()

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

## Database Creation Query
```
CREATE DATABASE online_bookstore
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

## Authors Table Creation Query
```
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    birth_date DATE
);
```

## Publishers Table Creation Query
```
CREATE TABLE Publishers (
    publisher_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    contact_email VARCHAR(255)
);
```

## Books Table Creation Query
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

## Customers Table Creation Query
```
CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    join_date DATE
);
```

## Orders Table Creation Query
```
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customers(customer_id),
    order_date DATE,
    total_amount DECIMAL(10, 2)
);
```

## OrderItems Table Creation Query
```
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(order_id),
    book_id INTEGER REFERENCES Books(book_id),
    quantity INTEGER,
    unit_price DECIMAL(10, 2)
);
```

## Reviews Table Creation Query
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

