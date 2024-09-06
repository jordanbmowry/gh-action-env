import { MongoClient } from 'mongodb';

// Environment variables
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

// MongoDB URI
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Function to connect to the database
async function connectToDB() {
  console.log('Trying to connect to db');

  try {
    await client.connect(); // Wait for connection
    await client.db(dbName).command({ ping: 1 }); // Ping the database
    console.log('Connected successfully to server');
    return client.db(dbName); // Return the connected database instance
  } catch (error) {
    console.error('Connection failed:', error.message);
    await client.close(); // Close the client on error
    console.log('Connection closed.');
    process.exit(1); // Exit the process in case of failure
  }
}

// Exporting the database connection
export const database = await connectToDB(); // Export the connected database
