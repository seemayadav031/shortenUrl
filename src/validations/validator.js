const isValidUrl = function (longUrl) {

    try {

        longUrl = longUrl.trim();

            if (!(longUrl.includes('//'))) {
                return false 
            };

            const urlParts = longUrl.split('//')
            const scheme = urlParts[0]
            const uri = urlParts[1]

            if (!(uri.includes('.'))) {
                return false 
            };

            const uriParts = uri.split('.')

            if (!(((scheme == "http:") || (scheme == "https:")) && (uriParts[0].trim().length) && (uriParts[1].trim().length))) {
                return false 
            }

            return true;

    } catch (error) {
           console.error(`Error!${error.message}`)
           return false;
    }

};

module.exports = { isValidUrl }