const urlModel = require('../models/urlModel.js');

const { isValidUrl } = require('../validations/validator.js');


const shortid = require('shortid');

const baseUrl = 'http://localhost:3000';

const { promisify } = require("util");

const { redisClient } = require("../redis.js");

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

//****************** API to make long url short ******************
let shortenUrl = async (req, res) => {

    let longUrl = req.body.longUrl;

    const shortCode = shortid.generate();

    if (longUrl) {
        try {

            longUrl = longUrl.trim();

            if (!isValidUrl(longUrl)) return res.status(500).send({ status: false, message: 'Invalid longUrl' });

            let shortenedUrlDetails;

            shortenedUrlDetails = await urlModel.findOne({ longUrl: longUrl });

            if (shortenedUrlDetails) {

                res.status(201).send({ status: true, data: shortenedUrlDetails });

            } else {

                const shortUrl = baseUrl + '/' + shortCode.toLowerCase();

                shortenedUrlDetails = await urlModel.create({ longUrl: longUrl, shortUrl: shortUrl, urlCode: shortCode })

                await SET_ASYNC(shortCode.toLowerCase(), longUrl);

                res.status(201).send({ status: true, data: shortenedUrlDetails })

            }
        }
        catch (error) {
            res.status(500).send({ status: false, msg: error.message })
        }
    } else {
        res.status(401).send({ status: false, msg: 'longUrl must be present in the body' })
    }

}

//****************** API to redirect to long url through urlcode ******************
let fetchOriginalUrl = async (req, res) => {
    try {

        let cachedLongUrl = await GET_ASYNC(req.params.urlCode);

        if (cachedLongUrl) {

            return res.redirect(cachedLongUrl)
        
        } else {

            const originalUrlDetails = await urlModel.findOne({  urlCode: req.params.urlCode });

            if (originalUrlDetails) {

                return res.redirect(originalUrlDetails.longUrl)
            
            } else {
            
                return res.status(404).send({ status: false, msg: 'No URL Found' })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

};


const getUrlList = async function (req, res) {

    let list = await urlModel.find();

    res.status(200).send({status:true, msg: list });
};



module.exports = {
    shortenUrl,
    fetchOriginalUrl,
    getUrlList
}