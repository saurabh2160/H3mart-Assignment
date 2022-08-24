// Requiring the module
const reader = require('xlsx')


//excel to json
function excelToJson(input) {
    const file = reader.read(input.buffer)

    //temp array to store product_code
    let temp = []

    //accessing object inside file on line 7
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        //this give us array of objects that will have product_code aka product_name
        temp = reader.utils.sheet_to_json(file.Sheets[sheets[i]])

    }

    return temp
}


//json to excel
async function json_to_excel(jsonData) {

    //creates a new book
    let upDatesheet = reader.utils.book_new()

    //conversion from json to sheet i.e excel
    const ws = reader.utils.json_to_sheet(jsonData)

    //write data on the the excelsheet that we just made on line 26 and makes a file with name that we mentioned
    reader.utils.book_append_sheet(upDatesheet, ws, "product_list.xlsx")

    //this operation takes a lot of time so used await 
    await reader.writeFile(upDatesheet, './product_list.xlsx')
    return true
}

module.exports = { json_to_excel, excelToJson }