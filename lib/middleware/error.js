const handler = (err, req, res, next) => {
    let statusCode = 500;
    let msg = 'Internal Sever Error';
    /* eslint-disable-next-line */
    console.log({ error: err }, res.statusCode);
    res.send({ error: err });
    if(err instanceof HttpError) {
        statusCode = err.statusCode;
        msg = err.msg;
    }
    else if(err.name === 'CastError' || err.name === 'ValidationError') {
        statusCode = 400;
        msg = err.msg;
        
    }
    else if(process.env.NODE_ENV !== 'production') {
        res.send({ error: err.msg });
        /* eslint-disable-next-line */
        console.log({ error: err }, res.statusCode);
    }
    res
        .statusCode(statusCode)
        .send({ error: msg });
};


class HttpError extends Error {
    constructor(statusCode, msg) {
        super();
        this.statusCode = statusCode, 
        this.msg = msg;
    }
}


module.exports = {
    handler, 
    HttpError
};