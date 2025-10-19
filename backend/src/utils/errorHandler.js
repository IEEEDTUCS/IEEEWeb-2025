class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default ErrorHandler;
