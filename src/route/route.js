const express = require('express')
const router = express.Router()

const { productList, index } = require('../controller/productlist')



router.post('/uploadexcelFile', productList)

//to make call from browser
router.get('/excelFile', index)



module.exports = router