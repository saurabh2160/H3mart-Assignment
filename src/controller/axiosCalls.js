const axios = require('axios')



//axios call to the product api
const apiCalls = async (productId) => {
    try {
        const url = ` https://api.storerestapi.com/products/${productId}`
        const headers = {
            "Accept": "application/json",
        }
        const apidata = await axios.get(url, { headers })

        //succesful response
        return {
            status: true, data: apidata.data.data
        }
    }
    catch (e) {
        console.log(e.message)
        return { status: false, message: e.message }
    }

}

module.exports = { apiCalls }

