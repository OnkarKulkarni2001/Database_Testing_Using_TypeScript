import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import CustomersService from './CustomersService';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = 3000;

const customersService = new CustomersService();

app.use(express.json());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Customers API',
            version: '1.0.0',
            description: 'API for managing customers',
        },
    },
    apis: ['main.ts'], // Replace with your actual filename
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to handle database connection
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
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     responses:
 *       200:
 *         description: A list of customers
 */
app.get('/customers', async (req: Request, res: Response) => {
    try {
        const customers = await customersService.getAll();
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers', err);
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retrieve a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single customer object
 *       404:
 *         description: Customer not found
 */
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

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               join_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Missing required fields
 */
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

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               join_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Missing required fields
 */
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

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
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