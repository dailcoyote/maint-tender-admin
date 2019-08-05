import Api from '@/services/Api'
import QueryString from "querystring"

export default {
    getProducts(){
        return Api().get(`products`);
    },
    updateProduct(payload){
        return Api().patch(`products/${payload._id}`, 
            QueryString.stringify({
                kzt: payload.prices.kzt,
                usd: payload.prices.usd,
                rub: payload.prices.rub,
            })
        );
    },
    exchangeRates(price){
        return Api().get(`exchange-rates?kzt=${price}`);
    },
    getCurrentExchRates(){
        return Api().get(`exchange-rates`);
    }
}