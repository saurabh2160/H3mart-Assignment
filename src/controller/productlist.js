
// const filepath = require('../../product_list.xlsx')
const { apiCalls } = require('./axiosCalls')

//file conversion fucntions
const { excelToJson, json_to_excel } = require('../excelfile/excelFile')



const productList = async (req, res) => {
    try {
        const data = req.files
        const json_excel_sheet = excelToJson(data[0])

        for (let i of json_excel_sheet) {
            //make api call to get product price
            const axiosres = await apiCalls(i.product_code)

            //if error is encountred in axios call
            if (axiosres.status == false) {
                return res.status(400).send({
                    status: false, msg: "enable to fetch product data"
                })
            }
            i["price"] = axiosres.data.price
        }
        //this is fucntion that will convert json to excel
        await json_to_excel(json_excel_sheet)

        return res.download("product_list.xlsx");

    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, data: e.message })
    }
}
const index = (req, res) => {
    res.send(
        `<form action="/uploadexcelFile" method='post' enctype="multipart/form-data">
            <input type="file" id="myFile" name="files">
            <input type="submit">
          </form>`

    )
}

module.exports = { productList, index }