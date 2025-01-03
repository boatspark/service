import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from '@/api-router';

// Define the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Disable the 'X-Powered-By' header for security reasons
app.disable('x-powered-by');

// Define a simple route for the root URL
app.get('/', (req, res) => { res.end(); });

// Use the API router for all routes starting with '/api'
app.use('/api', router);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
