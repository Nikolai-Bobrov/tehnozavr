import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";



Vue.use(VueRouter);

const routes = [
    {name: 'main', component: MainPage, path: '/' },
    {name: 'product', component: ProductPage, path:'/product/:id'},
    {name: 'basket', component: BasketPage, path:'/basket/'},
    {name: 'notFound', component: NotFoundPage, path:'*'},

];

const router = new VueRouter({
    routes
});
export default router