const AuthService = require('../services/auth.service');
const jwt = require('../utils/jwt');

exports.auth = () => (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body['x-access-token'];
    if(token){
        jwt.verify(token, (err, decoded) => {
            if(err){
                return next({
                    statusCode: 401,
                    payload: {
                        message: 'Invalid token!'
                    }
                });
            }else{
                const email = decoded.email;
                AuthService.checkAuth({ email: email })
                    .then(() => {
                        res.user = decoded;
                        next();
                    })
                    .catch(() => next({
                            statusCode: 401,
                            payload: {
                                message: 'Invalid token! Not found user'
                            }
                    }));
            }
        });
    }else{
        return next({
            statusCode: 401,
            payload: {
                message: 'Not authorized!'
            }
        });
    }
}