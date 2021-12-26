const isValidUrl = function (longUrl) {

    try {

        longUrl = longUrl.trim();

            if (!(longUrl.includes('//'))) {
                return false //res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            };

            const urlParts = longUrl.split('//')
            const scheme = urlParts[0]
            const uri = urlParts[1]
            let shortenedUrlDetails

            if (!(uri.includes('.'))) {
                return false //res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            };

            const uriParts = uri.split('.')

            if (!(((scheme == "http:") || (scheme == "https:")) && (uriParts[0].trim().length) && (uriParts[1].trim().length))) {
                return false //res.status(400).send({ status: false, msg: 'Invalid longUrl' })
            }

            return true;

    } catch (error) {
           res.status(500).send({ status: false , message : error.message });
    }

};

module.exports = { isValidUrl }