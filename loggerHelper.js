const crypto = require('crypto');
const httpContext = require('express-http-context');
const express = require('express');
const res = require('express/lib/response');


class Logger {
  constructor(app, name, logCacheSize) {
    this.name = name;
    this.logCacheSize = logCacheSize;
    this.logCache = []
    app.use(httpContext.middleware);
    app.use(function (req, res, next) {
      httpContext.set('reqUUID', crypto.randomUUID());
      next();
    });
  }

  log(level, message, error) {
    var reqUUID = httpContext.get('reqUUID');
    var requestId = reqUUID ? reqUUID : crypto.randomUUID();
    const output = `${new Date().toISOString().replace('T', ' ').split('.')[0]} :: requestId :: ${requestId} :: Logger :: ${this.name} :: Level :: ${level} :: Message :: ${message}`;
    if (level == 'info') {
      this.logCache.push(output);
    } else if (level = 'warn') {
      console.warn(output,error);
    } else {
      console.error(output,error);
    }
    if (this.logCache.length >= this.logCacheSize) {
      console.log(this.logCache.join('\r\n'));
      this.logCache = [];
    }
  }

  info(message) {
    this.log('info', message)
  }
  warn(message,error) {
    this.log('warn', message,error)
  }
  error(message,error) {
    this.log('error', message,error)
  }
  fatal(message,error) {
    this.log('fatal', message,error)
  }

}

function getLogger(app, name) {
  return new Logger(app, name, 1);
};


module.exports = {
  getLogger
};




