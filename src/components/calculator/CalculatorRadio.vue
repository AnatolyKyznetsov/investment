<template>
  <div class="calculator__item">
    <span class="calculator__value">
      {{ title }}
    </span>
    <span class="calculator__inner">
      <CustomRadio
        v-for="radio in radioButtons"
        :title="radio.value"
        :name="radio.name"
        :value="radio.value"
        :isChecked="radio.isChecked"
        :key="radio.id"
      />
    </span>
  </div>
</template>

<script>
import CustomRadio from '@/components/common/CustomRadio.vue';

export default {
  components: {
    CustomRadio,
  },
  props: {
    title: String,
    radioButtons: Array,
  },
};
</script>
