import { Client } from 'pg';

export interface Customer {
    customer_id?: number; // Optional for insert operations (auto-generated)
    name: string;
    email: string;
    phone: string;
    join_date: Date;
}

class CustomersService {
    private client: Client;
    private connected: boolean;

    constructor() {
        this.client = new Client({
            user: "root",
            host: 'localhost',
            database: "mid_term_project_book_store",
            password: "password",
            port: 5432,  // Default PostgreSQL port
        });
        this.connected = false;
    }

    async connect() {
        try {
            if (!this.connected) {
              await this.client.connect();
              this.connected = true;
              console.log('Connected to PostgreSQL database');
            }
          } catch (err) {
            console.error('Error connecting to PostgreSQL database', err);
            throw err;
          }
      }

    async disconnect() {
        try {
            if (this.connected) {
              await this.client.end();
              this.connected = false;
              console.log('Disconnected from PostgreSQL database');
            }
        } catch (err) {
            console.error('Error disconnecting from PostgreSQL database', err);
            throw err;
        }
    }

    async createTable() {
        const query = `
      CREATE TABLE IF NOT EXISTS customers (
        customer_id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR,
        phone VARCHAR,
        join_date DATE
      )
    `;

        try {
            await this.client.query(query);
            console.log('Customers table created or already exists');
        } catch (err) {
            console.error('Error creating customers table', err);
            throw err;
        }
    }

    async create(customer: Customer) {
        const { name, email, phone, join_date } = customer;
        
        const query = 'INSERT INTO customers(name, email, phone, join_date) VALUES($1, $2, $3, $4) RETURNING customer_id';
        const values = [name, email, phone, join_date];

        try {
            const result = await this.client.query(query, values);
            const createdCustomerId = result.rows[0].customer_id;
            console.log(`Created customer with ID ${createdCustomerId}`);
            return createdCustomerId;
        } catch (err) {
            console.error('Error creating customer', err);
            throw err;
        }
    }

    async findById(customerId: number) {
        const query = 'SELECT * FROM customers WHERE customer_id = $1';
        const values = [customerId];

        try {
            const result = await this.client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error(`Error fetching customer with ID ${customerId}`, err);
            throw err;
        }
    }

    async getAll() {
        console.log("it is here");
        const query = 'SELECT * FROM customers';

        try {
            console.log("it is here");
            const result = await this.client.query(query);
            console.log("it is here");
            return result.rows;
        } catch (err) {
            console.error('Error fetching all customers', err);
            throw err;
        }
    }

    async update(customerId: number, customer: Customer) {
        const { name, email, phone, join_date } = customer;
        const query = 'UPDATE customers SET name = $2, email = $3, phone = $4, join_date = $5 WHERE customer_id = $1';
        const values = [customerId, name, email, phone, join_date];

        try {
            await this.client.query(query, values);
            console.log(`Updated customer with ID ${customerId}`);
        } catch (err) {
            console.error(`Error updating customer with ID ${customerId}`, err);
            throw err;
        }
    }

    async delete(customerId: number) {
        const query = 'DELETE FROM customers WHERE customer_id = $1';
        const values = [customerId];

        try {
            await this.client.query(query, values);
            console.log(`Deleted customer with ID ${customerId}`);
        } catch (err) {
            console.error(`Error deleting customer with ID ${customerId}`, err);
            throw err;
        }
    }
}

export default CustomersService;