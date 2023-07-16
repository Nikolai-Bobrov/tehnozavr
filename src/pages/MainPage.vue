<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-item.sync="filterColor"/>

      <section class="catalog">
        
        <div v-if="productsLoading"><img src="/img/Hourglass.gif" alt="Идет загрузка"></div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров.<button @click.pri.prevent="loadProducts">Попробовать еще раз</button></div>

        <ProductList :products="products"/>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>

</template>


<script>
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import {API_BASE_URL} from "@/config";


export default {
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId:0,
      filterColor: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,

      productsLoading:false,
      productsLoadingFailed: false,
    }
  },
  computed: {
    products() {
      return this.productsData
          ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.image.file.url
            }
          })
          : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    }
  },
  methods: {
    loadProducts(){
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(()=> {
        axios.get(API_BASE_URL +`/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor
          }
        })
            .then(response => this.productsData = response.data)
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false);
      }, 0)
    }
  },
  watch:{
    page(){
      this.loadProducts()
    },
    filterPriceFrom(){
      this.loadProducts()
    },
    filterPriceTo(){
      this.loadProducts()
    },
    filterCategoryId(){
      this.loadProducts()
    },
    filterColor(){
      this.loadProducts()
    }
  },
  created() {
    this.loadProducts();
  }
}
</script>