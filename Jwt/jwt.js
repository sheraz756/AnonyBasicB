const jwt = require('jsonwebtoken')
const secretKey = "sheraz"
const jwtConfig = {
    sign(payload){
        const token = jwt.sign(payload,secretKey)
        return token

    },
    refreshSign(payload){
        const token = jwt.sign(payload,secretKey)
        return token

    },
  verifyToken(req, res, next) {
    // const token = req.query.token;
const token = req.body.token; // Extract the token from the request body

  if (!token) {
    return res.status(401).json('No token');
  }

  try {
    const decode = jwt.verify(token, secretKey);
    req.userId = decode.user._id;
    // console.log(decode)
    next();
  } catch (e) {
    console.log(e);
    res.status(403).json('Token is not valid');
  }
}

}


module.exports = jwtConfig