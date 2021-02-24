<template>
  <div class="calculator__item" :class="result ? 'calculator__item_multiplication' : ''" >
    <span class="calculator__value">
      {{ title }}
    </span>
    <span class="calculator__inner">
      <input
        class="calculator__input"
        v-model.number="changeValue"
        v-only-numbers
        :maxlength="maxLength"
        :class="error ? 'erroe' : ''"
        @focus="showRange(true)"
        @blur="showRange(false)"
      >
      <transition name="fade">
        <RangeSlider v-if="range" v-show="isRangeShown" v-model="rangeValue" />
      </transition>

      <span class="calculator__multiplication" v-if="result">= $ {{ result }}</span>
    </span>
    <label class="calculator__icon" v-html="icon"></label>
    <span class="calculator__error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import onlyNumbers from '@/directives/onlyNumbers';
import RangeSlider from '@/components/common/RangeSlider.vue';

export default {
  components: {
    RangeSlider,
  },
  props: {
    title: String,
    result: Number,
    icon: String,
    error: String,
    maxLength: Number,
    value: Number,
    range: Boolean,
  },
  data() {
    return {
      isRangeShown: false,
      rangeValue: 40,
    };
  },
  directives: {
    onlyNumbers,
  },
  methods: {
    showRange(value) {
      this.isRangeShown = value;
    },
  },
  computed: {
    changeValue: {
      get() {
        return this.value;
      },
      set(value) {
        if (typeof value === 'number') {
          this.$emit('input', value);
          this.rangeValue = value;
        } else if (value.length === 0) {
          this.$emit('input', 1);
          this.rangeValue = 1;
        }
      },
    },
  },
  watch: {
    rangeValue() {
      this.changeValue = this.rangeValue;
    },
    changeValue() {
      this.rangeValue = this.changeValue;
    },
  },
};
</script>
