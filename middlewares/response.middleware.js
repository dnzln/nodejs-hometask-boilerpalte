const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    
    if (res.hasOwnProperty('err')) {
        if (res.err.message.startsWith('404')) {
            res.status(404).json({
                error: true,
                message: res.err.message
            });
        } else {
            res.status(400).json({
                error: true,
                message: res.err.message
            });
        }
    } else if (res.data) {
        res.status(200).send(res.data)
    }
}

exports.responseMiddleware = responseMiddleware;