const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const {loginCode, registerCode, uploadImage, getImage} = require('../controller/image-controllers');

router.get('/login', loginCode);

router.get('/register', registerCode);

router.post('/upload', upload.single('file') , uploadImage);

router.get('/file/:fileId', getImage);

module.exports = router;