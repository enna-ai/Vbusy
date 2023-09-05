export const notFound = (req, res, next) => {
    const error = new Error(`404 Not Found - ${req.originalUrl}`);
    res.status(404);

    console.error(error);
    next(error);
};

export const castErrorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found.";
    }

    console.error(err);

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};