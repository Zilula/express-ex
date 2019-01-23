const express = require('express');
const app = express();
const Tweets = require('./routes/tweets');
const Tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const getQuote = require('./services/ronSwansonApi');

app.use((req, res, next) => {
    req.startAt = Date.now();
    const responseTime = Date.now() - req.startAt;
    /* eslint-disable-next-line */
    console.log('incoming request',
        req.method, req.url, [res.statusCode], responseTime + 'ms');
    next();
});
// app.use('/random', getQuote, (req, res, next)  =>{
//     req.quote = getQuote();
//     console.log('Ron Swanson Quote:', req.quote);
//     next();
// });




app.use(express.json());
app.use('/tweets', Tweets);
app.use('/tags', Tags);
app.use(notFound);
app.use(handler);



module.exports = app;
