export default {
  inserted(element) {
    element.addEventListener('input', () => {
      element.value = element.value.replace(/[^+\d]/g, '');
    });
  },
};
