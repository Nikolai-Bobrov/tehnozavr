<template>
  <router-view/>
<!--    <component :is="currentPageComponent" :page-params="currentPageParams" />-->
</template>

<script>
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";

const routes = {
  main: 'MainPage',
  product: 'ProductPage',

}

export default {

}
</script>


