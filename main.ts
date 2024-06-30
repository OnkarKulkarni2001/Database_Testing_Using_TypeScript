import express, { Request, Response } from 'express';
import CustomersService from './CustomersService';

const app = express();
const port = 3000;

const customersService = new CustomersService();

app.use(express.json());

app.use(async (req, res, next) => {
    try {
      await customersService.connect();
      next();
    } catch (err) {
      console.error('Error connecting to database', err);
      res.status(500).json({ error: 'Database connection error' });
    }
});

// Routes
app.get('/customers', async (req: Request, res: Response) => {
    try {
        
        const customers = await customersService.getAll();
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers', err);
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

app.get('/customers/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const customer = await customersService.findById(id);
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
        } else {
            res.json(customer);
        }
    } catch (err) {
        console.error(`Error fetching customer with ID ${id}`, err);
        res.status(500).json({ error: `Error fetching customer with ID ${id}` });
    }
});

app.post('/customers', async (req: Request, res: Response) => {
    const { name, email, phone, join_date } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newCustomerId = await customersService.create({ name, email, phone, join_date });
        res.status(201).json({ id: newCustomerId, message: 'Customer created successfully' });
    } catch (err) {
        console.error('Error creating customer', err);
        res.status(500).json({ error: 'Error creating customer' });
    }
});

app.put('/customers/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, email, phone, join_date } = req.body;
    if (!name || !email || !phone || !join_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await customersService.update(id, { name, email, phone, join_date });
        res.json({ id, message: 'Customer updated successfully' });
    } catch (err) {
        console.error(`Error updating customer with ID ${id}`, err);
        res.status(500).json({ error: `Error updating customer with ID ${id}` });
    }
});

app.delete('/customers/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
        await customersService.delete(id);
        res.json({ id, message: 'Customer deleted successfully' });
    } catch (err) {
        console.error(`Error deleting customer with ID ${id}`, err);
        res.status(500).json({ error: `Error deleting customer with ID ${id}` });
    }
});

// Middleware to handle database disconnection
app.use((req, res, next) => {
    customersService.disconnect().then(() => {
      console.log('Disconnected from database');
      next();
    }).catch((err) => {
      console.error('Error disconnecting from database', err);
      next(err);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});