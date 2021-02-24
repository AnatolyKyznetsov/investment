<template>
  <div class="dropdown" :class="isOpened ? 'is-opened' : '' " >
    <div class="dropdown__title" @click="changeState">
      {{ title }}
    </div>
    <div class="dropdown__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      isOpened: true,
    };
  },
  methods: {
    changeState() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>
