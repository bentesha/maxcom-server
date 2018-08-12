const express = require('express');
const userRouter = require('./user');
const regionRouter = require('./region');

const router = express.Router();

router.use('/users', userRouter);
router.use('/regions', regionRouter);

module.exports = router;