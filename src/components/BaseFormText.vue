<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" type="text" v-model="dataValue" :type="type" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
export default {
  props:['type'],
  mixins:[formFieldMixin]
}
</script>