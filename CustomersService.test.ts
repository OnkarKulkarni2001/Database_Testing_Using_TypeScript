import { Client } from 'pg';
import CustomersService, { Customer } from './CustomersService';

// Mocking PostgreSQL client for testing purposes
jest.mock('pg', () => {
    const mockClient = {
        connect: jest.fn(),
        end: jest.fn(),
        query: jest.fn(),
    };
    return {
        Client: jest.fn(() => mockClient),
    };
});

describe('CustomersService', () => {
    let service: CustomersService;
    let mockClient: any; 

    beforeEach(() => {
        mockClient = new Client();
        service = new CustomersService();
        service['client'] = mockClient;
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should create a new customer', async () => {
        const mockCustomer: Customer = {
            name: 'test test',
            email: 'test.test@gmail.com',
            phone: '1234567890',
            join_date: new Date(),
        };

        mockClient.query.mockResolvedValueOnce({ rows: [{ customer_id: 1 }] });

        const customerId = await service.create(mockCustomer);

        expect(customerId).toBe(1);
        expect(mockClient.query).toHaveBeenCalledWith(
            'INSERT INTO customers(name, email, phone, join_date) VALUES($1, $2, $3, $4) RETURNING customer_id',
            [mockCustomer.name, mockCustomer.email, mockCustomer.phone, mockCustomer.join_date]
        );
    });

    it('should find a customer by ID', async () => {
        const customerId = 1;
        const mockCustomer: Customer = {
            customer_id: customerId,
            name: 'test test',
            email: 'test.test@gmail.com',
            phone: '1234567890',
            join_date: new Date(),
        };

        mockClient.query.mockResolvedValueOnce({ rows: [mockCustomer] });

        const foundCustomer = await service.findById(customerId);

        expect(foundCustomer).toEqual(mockCustomer);
        expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM customers WHERE customer_id = $1', [customerId]);
    });

    it('should get all customers', async () => {
        const mockCustomers: Customer[] = [
            { customer_id: 1, name: 'Customer 1', email: 'customer1@gmail.com', phone: '1111111111', join_date: new Date() },
            { customer_id: 2, name: 'Customer 2', email: 'customer2@gmail.com', phone: '2222222222', join_date: new Date() },
        ];

        mockClient.query.mockResolvedValueOnce({ rows: mockCustomers });

        const allCustomers = await service.getAll();

        expect(allCustomers).toEqual(mockCustomers);
        expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM customers');
    });

    it('should update a customer', async () => {
        const customerId = 1;
        const updatedCustomer: Customer = {
            name: 'Customer 1',
            email: 'customer1@example.com',
            phone: '9999999999',
            join_date: new Date(),
        };

        await service.update(customerId, updatedCustomer);

        expect(mockClient.query).toHaveBeenCalledWith(
            'UPDATE customers SET name = $2, email = $3, phone = $4, join_date = $5 WHERE customer_id = $1',
            [customerId, updatedCustomer.name, updatedCustomer.email, updatedCustomer.phone, updatedCustomer.join_date]
        );
    });

    it('should delete a customer', async () => {
        const customerId = 1;

        await service.delete(customerId);

        expect(mockClient.query).toHaveBeenCalledWith('DELETE FROM customers WHERE customer_id = $1', [customerId]);
    });
});
