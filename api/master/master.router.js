const { createMaster, getMasterById, getMasters, updateMaster, deleteMaster, login } = require('./master.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createMaster);
router.get("/getMasterById/:id", checkToken, getMasterById);
router.get("/getMasters", checkToken, getMasters);
router.patch("/", checkToken, updateMaster);
router.delete("/", checkToken,  deleteMaster);
router.post("/login", login);

module.exports = router;