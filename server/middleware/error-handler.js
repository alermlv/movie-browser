export function asyncHandler(handler) {
  return function handleRequest(request, response, next) {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

export function handleNotFound(request, response, next) {
  const error = new Error("Route not found.");
  error.status = 404;
  next(error);
}

export function handleError(error, request, response, next) {
  const status = Number(error.status || 500);
  const message = status >= 500 ? "Internal server error." : error.message;

  response.status(status).json({
    error: {
      message,
    },
  });
}
