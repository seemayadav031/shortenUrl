const express = require('express');

const router = express.Router();

const urlController = require('../controllers/urlController.js')

//url shortening
router.post('/url/shorten',urlController.shortenUrl);

router.get('/:urlCode',urlController.fetchOriginalUrl);

router.get('/url/List',urlController.getUrlList);

module.exports = router;