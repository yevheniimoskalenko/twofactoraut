const { Router } = require('express')
const auth = require('../controller/auth.controller.js')
const login = require('../controller/login.controller.js')
const verefy = require('../controller/verefy.controller.js')
const generator = require('../controller/generator.controller.js')
const verefyc = require('../controller/verefyc.controller.js')
const router = Router()
router.post('/create', auth)
router.post('/login', login)
router.post('/verefy', verefy)
router.post('/verefyc', verefyc)
router.get('/generator', generator)
module.exports = router