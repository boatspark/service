import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as api, protectedRouter as secureApi } from '@/api-router';
import { router as metrics } from '@/metrics-router';

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

// Use the routers for matching routes
app.use('/api', api);
app.use('/sapi', secureApi)
app.use('/metrics', metrics);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
