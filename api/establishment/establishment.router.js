const { saveEstablishment, getById, loadData } = require('./establishment.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/Save", checkToken, saveEstablishment);
router.get("/getById/:id", checkToken, getById);
router.post("/LoadData", checkToken, loadData);

module.exports = router;