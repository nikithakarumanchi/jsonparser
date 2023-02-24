const express = require('express');
const JSONStream = require('JSONStream');
const loggerHelper = require('./loggerHelper');
const app = express();
let logger = loggerHelper.getLogger(app, 'logger.js')

/**
 * Task2: Body parser - To read and parse JSON body with out using external libraries.
 */
app.post("/parsejson", (req, res) => {
  let data = '';
  req.on('data', chunk => {
    //merging request chunks to form the full request body
    data += chunk.toString();
  });
  req.on('end', () => {
    try {
      const jsonData = JSON.parse(data); // Parsing the request body to JSON 
      console.log(jsonData); // logging the JSON body to console
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('JSON data received');
    } catch (error) {
      logger.error("Invalid JSON data", error);
      res.statusCode = 400;
      res.end('Invalid JSON data');
    }
  });
})

/**
 * Task3:Logger- To showcase custom logger capabilities implemented in loggerHelper.js.
 * We also use JSONStream to efficiently stream huge request body
 */
app.post('/streamjson', (req, res) => {
  const parser = JSONStream.parse('*'); //  Process large JSON data in a memory efficient way 
  req.pipe(parser);
  parser.on('data', (jsonData) => {
    logger.info(JSON.stringify(jsonData)); // Invoking logger.info method in Logger class
  });
  parser.on('end', () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('JSON data received');
  });
});

/** 
 * Task3:Logger- To showcase custom logger capabilities implemented in loggerHelper.js 
 **/
app.get('/loggerget', (req, res) => {
  const level = req.query.level;
  if (level == 'info') {
    logger.info('Basic Logger');
  }
  else {
    logger.error("Query Parameter unavailable or not info");
  }
  res.statusCode = 200;
  res.end('Logging done');
})

/**
 * Health Endpoint to enable health checks of the APP.
 */
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const PORT = process.env.PORT || 8081;

// Creating a server with the PORT variable declared above
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`)
});

