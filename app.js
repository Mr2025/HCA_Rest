////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPRESS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const indexRouter = require('./public/publicRouter');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Debugging
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createError = require('http-errors');
const  logger = require('morgan');
const debug = require('debug')
const error = debug('App:error');
const log = debug('App');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create Server
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const server = express();  
log('Installing Morgan (callTracking)');
server.use(logger('dev'));                   

log('Installing Public Router');
server.use('/', indexRouter);

log('Installing InternetSite 404');  
// catch 404 and forward to error handler
server.use(function(req, res, next) {
next(createError(404));
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event Handlers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.onConnect = ()=>{
    indexRouter.onConnect();
}

server.onClose = ()=>{
    indexRouter.onClose();
}

module.exports = server;