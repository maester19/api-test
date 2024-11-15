const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

router.get('/:id', user.getOneUser);

router.put('/:id', auth, multer, user.modifyUser);

router.put('/AdminAcceptUser/:id', auth, multer, user.adminAcceptUser);

router.put('/AdminRejectUser/:id', auth, multer, user.adminRejectUser);

router.put('/AdminBlockUser/:id', auth, multer, user.adminBlockUser);

router.delete('/:id', auth, user.deleteUser);

router.get('/AdminGetAllUser/', auth, user.adminGetAllUser);

router.get('/AdminGetUserByRole/:role', auth, user.adminGetUserByRole);

router.get('/checkIfIsAdmin/', auth, user.checkIfIsAdmin);


module.exports = router