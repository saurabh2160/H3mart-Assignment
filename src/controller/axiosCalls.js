const axios = require('axios')



//axios call to the product api
const apiCalls = async (productarr) => {
    try {
        let arr = []
        for (let i of productarr) {
            //console.log(i);
            const url = `https://api.storerestapi.com/products/${i.product_code}`
            const headers = {
                "Accept": "application/json",
            }
            const apidata = axios.get(url, { headers })
            arr.push(apidata)
        }

        //for looping to make a new key inside original object
        for (let i = 0; i < arr.length; i++) {
            let result = await arr[i]
            productarr[i]['product_price'] = result.data.data.price;
        }
        return {
            status: true, data: productarr
        }

    }
    catch (e) {
        console.log(e.message)
        return { status: false, message: e.message }
    }

}

module.exports = { apiCalls }

