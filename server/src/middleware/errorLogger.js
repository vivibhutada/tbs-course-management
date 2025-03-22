const alldb = require('../db');
const db = alldb.db;

const errorLogger = async (error, req, res, next) => {
  console.error('Error caught by errorLogger middleware:', error);

  // Construct the error object
  const errorObj = {
    originalUrl: req.originalUrl,
    method: req.method,
    session: req.user || 'Without Session',
    payload: req.body || '',
    ip: req.ip,
    status: error.status || 500,
    name: error.name || '',
    message: error.message || '',
    errorsql: error.sql || '',
  };

  try {
    // Log the error to the database
    await db.sequelize.query(
      `INSERT INTO log_errors (error_message, createdon) VALUES (?, now())`,
      {
        replacements: [JSON.stringify(errorObj)],
        type: db.sequelize.QueryTypes.INSERT,
      }
    );
  } catch (dbError) {
    console.error('Failed to log error to database:', dbError);
  }

  // Send a response if headers are not already sent
  if (!res.headersSent) {
    const responseMessage = error.message
      ? "We're sorry for the inconvenience. Please try again after some time."
      : "We're having trouble connecting to the server. Please try again later.";

    const statusCode = error.status || 500;

    // res.status(statusCode).send({
    //   statusCode,
    //   message: responseMessage,
    //   error: error.message || '',
    // });

    return commonHelper.sendErrorResponse(res, statusCode, 'fail', responseMessage,error.message);
      
  }
};

module.exports = errorLogger;
