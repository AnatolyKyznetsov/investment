<template>
  <div class="buttons-group">
    <button class="button button_red" @click="transactionChange('reduction')">
      <span>В снижение</span>
    </button>
    <button class="button button_green"  @click="transactionChange('growth')">
      <span>В рост</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    transaction: String,
  },
  methods: {
    transactionChange(value) {
      this.$emit('update:transaction', value);
    },
  },
};
</script>
