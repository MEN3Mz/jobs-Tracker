const { BadRequestError } = require('../errors')
const { request } = require('express')
const User = require('../models/User')

const testUser = async(req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Test user. Read only')
    }
    next();
};


module.exports = testUser