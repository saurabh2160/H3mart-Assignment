
// const filepath = require('../../product_list.xlsx')
const { apiCalls } = require('./axiosCalls')

//file conversion fucntions imported from excelfile
const { excelToJson, json_to_excel } = require('../excelfile/excelFile')



const productList = async (req, res) => {
    try {
        const data = req.files
        const json_excel_sheet = excelToJson(data[0]) //returns array of objects with object containing product_code 


        //make api call to get product price
        let arr_prices = await apiCalls(json_excel_sheet)
        if (arr_prices.status === false) {
            return res.status(400).send({ status: false, data: "error in fetch data from api" })
        }
        //this is fucntion that will convert json to excel
        await json_to_excel(arr_prices.data)

        //sending response to download updated file
        return res.download("product_list.xlsx");

    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, data: e.message })
    }
}

//if you make call from browser this will help in that and route in mention in route file
const index = (req, res) => {
    res.send(
        `<form action="/uploadexcelFile" method='post' enctype="multipart/form-data">
            <input type="file" id="myFile" name="files">
            <input type="submit">
          </form>`

    )
}

module.exports = { productList, index }