const securityMiddleware = async (req, res, next) => {
    console.log('this is a middleware');
    return next();
}

module.exports = securityMiddleware;