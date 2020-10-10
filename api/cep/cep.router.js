const { getCep } = require('./cep.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/:cep", checkToken, getCep);

module.exports = router;