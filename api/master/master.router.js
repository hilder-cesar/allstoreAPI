const { saveMaster, getMasterById, getMasters, getInfo, deleteMaster, login, loadData } = require('./master.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/Save", checkToken, saveMaster);
router.get("/getMasterById/:id", checkToken, getMasterById);
router.get("/getMasters", checkToken, getMasters);
router.get("/getInfo", checkToken, getInfo);
router.delete("/Delete", checkToken,  deleteMaster);
router.post("/LoadData", checkToken, loadData);
router.post("/Login", login);

module.exports = router;