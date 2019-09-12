let jwt = require('jsonwebtoken')

//for create token
exports.createToken = async (user) => {
    let payload = {
        email: user,
        id: user._id
    }
    let token = jwt.sign(payload, 'secret')
    return token;
}

//for check-token
exports.checkAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            let decoded = jwt.verify(token, 'secret');
            req.userData = decoded;
            next();
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}
