
// const filepath = require('../../product_list.xlsx')
const { apiCalls } = require('./axiosCalls')

//file conversion fucntions imported from excelfile
const { excelToJson, json_to_excel } = require('../excelfile/excelFile')



const productList = async (req, res) => {
    try {
        const data = req.files
        const json_excel_sheet = excelToJson(data[0]) //returns array of objects with object containing product_code 

        //for looping the array of objects to send the product_code in axios call
        for (let i of json_excel_sheet) {

            //make api call to get product price
            const axiosres = await apiCalls(i.product_code)

            //if error is encountred in axios call
            if (axiosres.status == false) {
                return res.status(400).send({
                    status: false, msg: `enable to fetch product data${i.product_code}`
                })
            }
            //new key name price getting created and value also assigned in the object that we are currently inside
            i["price"] = axiosres.data.price
        }
        //this is fucntion that will convert json to excel
        await json_to_excel(json_excel_sheet)

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