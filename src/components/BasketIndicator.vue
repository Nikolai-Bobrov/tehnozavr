<template>
  <router-link class="header__cart" :to="{name: 'basket'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.basketProduct.length }}</span>
  </router-link>
</template>

<script>
  export default {

  }
</script>