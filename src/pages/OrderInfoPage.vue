<template>
  <main class="content container" v-if="orderInfo=== null"><img src="/img/Hourglass.gif" alt="Идет загрузка"> </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <router-link :to="{name:'main'}" class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Каталог
          </a>
        </router-link>
        <router-link :to="{name: 'basket'}" class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#">
            Корзина
          </a>
        </router-link>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
<!--            <li class="dictionary__item">-->
<!--              <span class="dictionary__key">-->
<!--                Способ оплаты-->
<!--              </span>-->
<!--              <span class="dictionary__value">-->
<!--                картой при получении-->
<!--              </span>-->
<!--            </li>-->
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in orderInfo.basket.items" :key="product.product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>

          </ul>

          <div class="cart__total">
<!--            <p>Доставка: <b>500 ₽</b></p>-->
            <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> товара на сумму <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main >

</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import {mapGetters} from "vuex";

export default {
  created() {
    if(this.$store.state.orderInfo && this.$store.state.orderInf.id === this.$route.params.id){
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters({orderInfo: 'orderInfo'})
  }
}
</script>
