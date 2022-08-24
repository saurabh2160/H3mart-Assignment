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

// { "status": 200, "data": { "_id": "61ab420c0f34753bcedfa787", "title": "special cotton shirt for men", "price": 15, "category": { "_id": "61ab1ca64a0fef3f27dc663f", "name": "men's fashion", "slug": "mens-fashion" }, "description": "", "createdBy": { "role": "ROLE_CUSTOMER", "_id": "612e49b9345dcc333ac6cb41", "name": "Sofia Lily" }, "createdAt": "2021-12-04T10:25:16.546Z", "updatedAt": "2021-12-11T03:14:40.195Z", "slug": "special-cotton-shirt-for-men", "image": "" }, "message": "Success! Product found" }