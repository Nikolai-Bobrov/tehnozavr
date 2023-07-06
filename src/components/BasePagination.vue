<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' :page === 1 }" aria-label="Предыдущая страница"  v-on:click.stop="page === 1" @click.prevent="paginateBack( page  - 1 )" >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumbers in pages" :key="pageNumbers">
      <a href="#" class="pagination__link" :class="{'pagination__link--current' : pageNumbers === page}" @click.prevent=" paginate(pageNumbers)">
        {{ pageNumbers }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' :page === pages }" href="#" aria-label="Следующая страница" v-on:click.stop="page === pages" @click.prevent="paginateNext( page  + 1 )">
        <svg width="8" height="14" fill="currentColor">

          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate'
  },
  props:['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    }
  },
  methods: {
    paginate(page){
      this.$emit('paginate', page);
    },
    paginateBack(page){
      if (page !== 0){
        this.$emit('paginate', page);
      }
    },
    paginateNext(page){
      if(page !== this.pages + 1){
        this.$emit('paginate', page);
      }
    }

  }
}
</script>

<style scoped>

</style>