const express = require('express');
const urlRoute = require('./routes/url');
const { connectDB } = require('./connect');
const URL = require('./models/url');
const path = require('path');
const staticRoute = require('./routes/staticRoute');

const app = express();
const port = 4000;

connectDB('mongodb://127.0.0.1:27017/urlShortner')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortID', async (req, res) => {

    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortID
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            },
        },
        {
            new: true
        }
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
});

app.listen(port, () => {
    console.log(`Server running port : ${port}`);
});