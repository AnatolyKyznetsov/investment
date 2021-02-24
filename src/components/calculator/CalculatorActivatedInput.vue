<template>
  <div class="calculator__item">
    <CustomCheckbox type="checkbox" :title="title" v-model="isChecked" />
    <input
      class="calculator__input"
      v-only-numbers
      :disabled="!isChecked"
      v-model.number="restrictionsChange"
      :class="error ? 'erroe' : ''"
    >
    <CounterButtons v-model.number="restrictionsChange" />
    <label class="calculator__icon" v-html="icon"></label>
    <span class="calculator__error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import onlyNumbers from '@/directives/onlyNumbers';
import CustomCheckbox from '@/components/common/CustomCheckbox.vue';
import CounterButtons from '@/components/common/CounterButtons.vue';

export default {
  components: {
    CustomCheckbox,
    CounterButtons,
  },
  directives: {
    onlyNumbers,
  },
  props: {
    title: String,
    icon: String,
    error: String,
    counter: Boolean,
    sumInvestment: Number,
  },
  data() {
    return {
      isChecked: false,
      restrictions: Math.round(this.sumInvestment * 0.3),
    };
  },
  computed: {
    restrictionsChange: {
      get() {
        return this.restrictions;
      },
      set(value) {
        if (value === '') {
          this.restrictions = 0;
        } else {
          this.restrictions = value;
        }
      },
    },
    countRestrictions() {
      return this.icon === '$' ? Math.round(this.sumInvestment * 0.3) : 30;
    },
  },
  watch: {
    icon() {
      this.restrictions = this.countRestrictions;
    },

    sumInvestment() {
      this.restrictions = this.countRestrictions;
    },

    isChecked() {
      if (this.isChecked === false) {
        this.restrictions = this.countRestrictions;
        this.$emit('input', 0);
        return;
      }
      this.$emit('input', this.restrictions);
    },

    restrictions() {
      this.$emit('input', this.restrictions);
    },
  },
};
</script>
