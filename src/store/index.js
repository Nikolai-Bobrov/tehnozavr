import Vue from "vue";
import Vuex from "vuex";
import products from "@/data/products";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        basketProduct: [
            { productId: 1, amount: 1 }
        ]
    },
    mutations: {
        addProductToBasket(state,{productId, amount}){
            const item = state.basketProduct.find(item =>item.productId === productId);
            if(item){
                item.amount += amount;
            } else {
                state.basketProduct.push({
                    productId,
                    amount
                })
            }
        },
        updateCartProductAmount(state,{productId, amount}){
            const item = state.basketProduct.find(item =>item.productId === productId);
            if(item){
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId){
            state.basketProduct = state.basketProduct.filter(item => item.productId !== productId);
        }
    },
    getters: {
        basketDetailProducts(state){
            return state.basketProduct.map(item => {
                return {
                    ...item,
                    product: products.find(p => p.id === item.productId)
                }
            });
        },
        basketTotalPrice(state, getters){
            return getters.basketDetailProducts.reduce((acc, item) => (item.product.price * item.amount)+acc,0)
        }
    }
});