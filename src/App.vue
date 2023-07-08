<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-item.sync="filterColor"/>

      <section class="catalog">
        <ProductList :products="products"/>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>



</template>

<script>
import products from "@/data/products";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter.vue";


export default {
  name: 'App',
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId:0,
      filterColor: '',

      page: 1,
      productsPerPage: 3
    }
  },
  computed: {
    filteredProduct(){
      let filteredProducts = products;

      if(this.filterPriceFrom > 0 ){
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom)
      }
      if(this.filterPriceTo > 0 ){
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo)
      }
      if(this.filterCategoryId){
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId)
      }
      if(this.filterColor){
        filteredProducts = filteredProducts.filter(product => product.colors.some(it => it.color === this.filterColor))
      }
      return filteredProducts
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProduct.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProduct.length;
    }
  }
}
</script>


