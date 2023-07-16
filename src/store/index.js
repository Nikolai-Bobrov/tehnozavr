import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_BASE_URL} from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        basketProduct: [],
        userAccessKey: null,
        basketProductsData: []
    },
    mutations: {
        updateCartProductAmount(state,{productId, amount}){
            const item = state.basketProduct.find(item =>item.productId === productId);
            if(item){
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId){
            state.basketProduct = state.basketProduct.filter(item => item.productId !== productId);
        },
        updateUserAccessKey(state, accessKey){
            state.userAccessKey = accessKey;
        },
        updateBasketProductsData(state, items){
            state.basketProductsData = items;
        },
        syncBasketProducts(state){
            state.basketProduct = state.basketProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        }
    },
    getters: {
        basketDetailProducts(state){
            return state.basketProduct.map(item => {
                const product = state.basketProductsData.find(p => p.product.id === item.productId).product;
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            });
        },
        basketTotalPrice(state, getters){
            return getters.basketDetailProducts.reduce((acc, item) => (item.product.price * item.amount)+acc,0)
        }
    },
    actions: {
        loadBasket(context){
            return axios
                .get(API_BASE_URL + '/api/baskets', {
                    params:{
                        userAccessKey: context.state.userAccessKey
                    }

                })
                .then(response => {
                    if(!context.state.userAccessKey){
                        localStorage.setItem('userAccessKey', response.data.user.accessKey)
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }
                    context.commit('updateBasketProductsData', response.data.items);
                    context.commit('syncBasketProducts');
                })

        },
        addProductToBasket(context, {productId, amount}){
            return (new Promise(resolve => setTimeout(resolve, 500)))
                .then(()=>{
                    return axios
                        .post(API_BASE_URL + '/api/baskets/products', {
                            productId: productId,
                            quantity: amount
                        }, {
                            params:{
                                userAccessKey: context.state.userAccessKey
                            }
                        })
                        .then(response =>{
                            context.commit('updateBasketProductsData', response.data.items);
                            context.commit('syncBasketProducts');
                        })
                })

        },
        updateBasketProductAmount(context, {productId, amount}){
            context.commit('updateCartProductAmount', {productId, amount});

            if(amount < 1){
                return ;
            }
            return axios
                .put(API_BASE_URL + '/api/baskets/products', {
                    productId: productId,
                    quantity: amount
                }, {
                    params:{
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response =>{
                    context.commit('updateBasketProductsData', response.data.items);

                })
                .catch(()=> {
                    context.commit('syncBasketProducts');
                })
        },
        deleteProductBasket(context, {productId}){
            return axios
                .delete( API_BASE_URL + '/api/baskets/products', {
                   params: {
                        userAccessKey: context.state.userAccessKey,

                    },
                    data: {
                        productId: productId
                    }
                })
                .then(response =>{
                    context.commit('updateBasketProductsData', response.data.items);

                })
                .catch(()=> {
                    context.commit('syncBasketProducts');
                })
        }

    }
});