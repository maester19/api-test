const express = require('express')
const router = express.Router()
const role = require('../controllers/role')

const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

router.post('/', auth, multer, role.createProfil);

router.get('/:id', auth, role.getOneProfil);

router.put('/:id', auth, multer, role.modifyProfil);

router.delete('/:id', auth, role.deleteProfil);

router.get('/', auth, role.getAllProfil);


module.exports = router