const errorMiddleware = async(err, req, resp, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from backend";

    return resp.status(status).json({message, extraDetails});
}

module.exports = errorMiddleware;