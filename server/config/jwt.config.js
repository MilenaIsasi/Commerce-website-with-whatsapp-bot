const jwt = require("jsonwebtoken");
const secret ="Esto"
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.user_token, secret, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false});
        } else {
            req.usuario = payload;
            next();
        }
    });
}
module.exports.admin = (req, res, next) => {
    jwt.verify(req.cookies.user_token, secret, (err, payload) => {
        console.log(payload)
        if (err) {
            res.status(401).json({ verified: false });
        } else if (payload.rol !== 'admin') {
            res.status(401).json({ verified: false });
        }
        else {
            next();
        }
    });
}
