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
