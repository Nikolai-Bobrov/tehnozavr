<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field" v-if="basketProductLoading"><img src="/img/Hourglass.gif" alt="Идет загрузка"></div>
        <div class="cart__field" v-else-if="basketProductLoadingError">Произошла ошибка при загрущке товаров</div>
        <div class="cart__field" v-else>
          <ul class="cart__list">
            <BasketItem v-for="item in products" :item="item" :key="item.product.id"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BasketItem from "@/components/BasketItem.vue";
import { mapGetters, mapMutations } from "vuex";

export default {

  components:{
    BasketItem
  },
    filters: {
      numberFormat
    },
    computed: {
      ...mapGetters({products: 'basketDetailProducts', totalPrice: 'basketTotalPrice', basketProductLoading: 'basketProductLoading', basketProductLoadingError: 'basketProductLoadingError'}),

    }
}
</script>