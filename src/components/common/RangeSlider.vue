<template>
  <div class="range">
    <range-slider
      min="1"
      max="40"
      step="1"
      v-model="sliderValue">
    </range-slider>
    <div class="range__markers">
      <span>1</span>
      <span>5</span>
      <span>20</span>
      <span>40</span>
    </div>
  </div>
</template>

<script>
import 'vue-range-slider/dist/vue-range-slider.css';
import RangeSlider from 'vue-range-slider';

export default {
  props: {
    value: Number,
  },
  data() {
    return {
      sliderValue: 40,
    };
  },
  components: {
    RangeSlider,
  },
  watch: {
    sliderValue() {
      this.$emit('input', this.sliderValue);
    },
    value() {
      this.sliderValue = this.value;
    },
  },
};
</script>

<style lang="scss">
.range {
  &-slider {
    width: 100%;

    &-rail {
      background: #909294;
    }

    &-fill {
      background: #7e98e5;
    }

    &-knob {
      background: #7e98e5;
      border: 0;

      &:after {
        content: '';
        display: block;
        border-radius: 100%;
        width: 6px;
        height: 6px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

</style>
