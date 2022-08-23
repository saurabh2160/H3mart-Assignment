// Requiring the module
const reader = require('xlsx')


//excel to json
function excelToJson(input) {
    const file = reader.read(input.buffer)

    let data = []

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])

        temp.forEach((res) => {
            data.push(res)
        })
    }
    return data
}
//json to excel
async function json_to_excel(jsonData) {

    let upDatesheet = reader.utils.book_new()
    const ws = reader.utils.json_to_sheet(jsonData)

    reader.utils.book_append_sheet(upDatesheet, ws, "product_list.xlsx")
    await reader.writeFile(upDatesheet, './product_list.xlsx')
    return true
}

module.exports = { json_to_excel, excelToJson }