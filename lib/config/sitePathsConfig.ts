export const PLACEHOLDER = 'PLACEHOLDER';
export const siteBaseApiUrl = 'http://localhost:3000/api';

export const siteApiConfig = {
    categoriesApi : {
        baseApi:'/categories'
    },
    promotionlTagApi : {
        baseApi : '/promotional-tags'
    },
    orders : {
        baseApi : `/orders`,
        fetchById : `/orders/${PLACEHOLDER}`
    },
    images : {
        baseApi : '/api/images',
        fetchAllImagesApi : '/api/images?folder='
    },
    thankyou : {
        apiPath : `/thankyou/${PLACEHOLDER}`,
        params : {
            orderID : 'order'
        }
    },
    product : {
        baseApi : siteBaseApiUrl + `/product`,
        fetchById : siteBaseApiUrl + `/product/${PLACEHOLDER}`,
        fetchByCategoryName : siteBaseApiUrl + `/product/category/${PLACEHOLDER}`
    },
    address : {
        baseApi : siteBaseApiUrl + `/address`,
        fetchById : siteBaseApiUrl + `/address?userId=${PLACEHOLDER}`
    }
}
