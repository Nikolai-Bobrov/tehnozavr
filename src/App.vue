<template>
  <div>
    <HeaderTag/>
    <router-view/>
    <FooterTag/>
  </div>
</template>

<script>
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import HeaderTag from "@/components/HeaderTag.vue";
import FooterTag from "@/components/FooterTag.vue";
import { mapActions, mapMutations} from "vuex";

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
  basket: 'BasketPage',

}

export default {
  components:{HeaderTag,FooterTag},
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if(userAccessKey){
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadBasket();
  },
  methods: {
    ...mapActions(['loadBasket']),
    ...mapMutations(['updateUserAccessKey'])
  }

}
</script>


