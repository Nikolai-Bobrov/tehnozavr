<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <router-link class="header__logo" :to="{name: 'main'}"href="#">
        <img src="/img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <BasketIndicator/>

    </div>
  </header>
</template>


<script>
import BasketIndicator from "@/components/BasketIndicator.vue";
  export default {
    components:{BasketIndicator}
  }
</script>
