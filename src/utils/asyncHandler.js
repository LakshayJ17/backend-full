const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({success : false, message : error.message})
//     }
// }

/*
It wraps any route handler (requestHandler) in a function that automatically catches rejected promises.

Promise.resolve(...).catch(next) ensures that if requestHandler throws or rejects, Express gets the error through next(err).

This allows you to write async route handlers without explicit try/catch in every function.
*/