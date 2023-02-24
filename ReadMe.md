# Project Title 
JSON Parser and Logger Extension

# Introduction
This project provides two components JSON Body Parser and a Logger plugin with out using external ready libraries.

# Getting Started
- Install node.js and  VS code editor 
- Install required npm packages  (npm install)

# Build and Test
- node index.js or npm start

# Assumtions 
   - '/parsejson' : This route could be leveraged when whole JSON needs to be available for further business requirements.  
   - '/streamjson' :  This route could be leveraged when whole JSON is not required to be available and chunks of data could be processed individually.


# Design Notes 

  * Body Parser task
       -  Request body can be made accessible by merging the request chunks. Depending on the requirement, we use the request end event to parse the JSON data by using 'JSON.parse()' function and logs the output to console. 
       -  We can also use 'JSONStream.parser()' particularly for large JSON requests or an in-built function 'express.json()' which again uses body-parser(middleware module) to parse small to medium jsons. But we chose not to do so, due to the explict requirement of restricting the usage of external libraries. 

  * Logger task
       - We have created a custom Logger module in loggerHelper.js to help us enable standard logging across the application while assigning unique UUID for all logs of a request.
       - Logger module contains a logger class which contains a constructor, log, info, error and fatal methods to helper developer write different logs based on requirement. 
       - These Logger methods can be accessible from anywhere in the application . We have used these logger methods in router components '/streamjson' & '/loggerget' in index.js
       - In loggerHelper.js we have getLogger function which instantiates logger module.
  *  Health route
        - This route exposes the health of app which allows node app to maintain availability in remote servers
        
# Known Improvements 
 
 - We can make logging module Asynchronous using worker thread module to reduce logging IO impact on request routes
 