<template>
  <div id="app">
    <section className="catalog">
      <ProductList :products="products"/>

      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
  </div>
</template>

<script>
import products from "@/data/products";
import ProductList from "@/components/ProductList";
import BasePagination from "@/components/BasePagination";


export default {
  name: 'App',
  components: {ProductList, BasePagination},
  data() {
    return {
      page: 1,
      productsPerPage: 3
    }
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    }
  }
}
</script>


