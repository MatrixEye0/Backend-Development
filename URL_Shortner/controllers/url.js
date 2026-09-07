const {nanoid}= require('nanoid');
const URL = require('../models/url');

async function genrateShortUrl(req,res){
  const shortID = nanoid(6);
  if(!req.body.url) return res.status(400).json({error:"URL is required"});

  await URL.create({shortId:shortID,
    redirectURL:req.body.url,
    visitHistory:[]
});
return res.redirect(`/?id=${shortID}`);
}


module.exports = {genrateShortUrl};