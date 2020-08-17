const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // module import
const { APIError } = require('../error/BaseError');
const secretKey = '11';

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('----------isLoggedin-------------' + token);
    let exp;
    try {
        exp = await jwt.verify(token, secretKey);    
        console.log(exp);
    } catch (error) {
        // console.log(error);
        // throw new APIError(error)
        throw new APIError('Not found'+error,401)
    }finally{
        res.send('respond with a resource');
    }
    
});

module.exports = router;
