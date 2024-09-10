export class AppError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }

  
export class ValidationError extends AppError {
    constructor(message = 'Invalid input') {
      super(message, 400);
    }
  }
  
 export function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err instanceof AppError) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message
      });
    }
  
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    });
  }
  
