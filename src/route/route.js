const express = require('express')
const router = express.Router()

const { productList, index } = require('../controller/productlist')



router.post('/uploadexcelFile', productList)
router.get('/', index)



module.exports = router