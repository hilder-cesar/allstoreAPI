const { createMaster, getMasterById, getMasters, getInfo, updateMaster, deleteMaster, login } = require('./master.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/CreateMasterUser", createMaster);
router.get("/getMasterById/:id", checkToken, getMasterById);
router.get("/getMasters", checkToken, getMasters);
router.get("/getInfo", checkToken, getInfo);
router.patch("/Update", checkToken, updateMaster);
router.delete("/Delete", checkToken,  deleteMaster);
router.post("/Login", login);

module.exports = router;