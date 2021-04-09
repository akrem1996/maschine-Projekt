const jwt = require('jsonwebtoken');
const accessTokenSecret = require('./config')


function authenticate (request , response , next){
    const tokenHeader = request.headers.token;
    if(tokenHeader){
        jwt.verify(tokenHeader, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            request.user = user;
            next();
        });
    } else {
        response.send("no token")
    }
}

module.exports = authenticate;