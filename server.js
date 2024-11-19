const http = require('http');


const PORT = 5000;

// Create the server
const server = http.createServer((req, res) => {
  // Set a default response header (common for all routes)
  res.setHeader('Content-Type', 'application/json');

  // Handle routes and HTTP methods
  if (req.method === 'GET') {
  // we use req.url to check which url the cleint is requesting,if the request for the ruote is/ then all is well the res.send send a message back to the client
    if (req.url === '/') {
      // Root route (GET /)
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Welcome to the Node.js Server!' }));
    } else if (req.url === '/about') {
      // About route (GET /about)
      
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'This is a basic Node.js server with routing.' }));
    } else {
      // 404 Not Found for unknown routes
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  } else if (req.method === 'POST') {
    // Sometimes, a client (like Postman or a form on a webpage) sends data to the server. We use a POST request for that.so 
    //If the client makes a POST request to /data, we collect the data sent by the client (req.on('data')).
//After receiving all the data, we send a response back to the client with the message "Data received" and the data they sent.
    if (req.url === '/data') {
      let body = '';

      // Collect data from the incoming request
      req.on('data', chunk => {
        body += chunk;
        //What It Does:
//Listens for incoming data: When a client sends a POST request with data, it often arrives in multiple chunks (especially for large data).
//Accumulates the data: The data event handler collects each chunk of data and adds it to the body variable. Over time, all chunks are combined into one complete piece of data.
//Waits for the complete request: After all chunks are received, the 'end' event is triggered, signaling that the entire data has been received and can now be processed.
      });

      // Once the full body is received, process it
      req.on('end', () => {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Data received', data: JSON.parse(body) }));
      });
    } else {
      // 404 Not Found for unknown POST routes
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  } else {
    // Handle unsupported HTTP methods (e.g., PUT, DELETE)
    res.statusCode = 405; // Method Not Allowed
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
