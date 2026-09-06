const exp = require('express');
const {genrateShortUrl} = require('../controllers/url');

const router = exp.Router();

router.post('/',genrateShortUrl);


module.exports = router;