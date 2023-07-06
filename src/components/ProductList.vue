<template>
  <ul class="catalog__list">

    <ProductItem v-for="product in products" :product="product" :key="product.id"/>

  </ul>
</template>

<script>
import products from "@/data/products";
import ProductItem from "@/components/ProductItem";

export default {
  props: ['products', 'index'],
  components: {ProductItem},


}
</script>

<style scoped>

</style>