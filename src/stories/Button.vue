<template>
  <button
    @click="handleClick"
    :disabled="disabled||false"
    :class="[
    'button',
    'button-' + (disabled ? 'disabled' : kind),
    size  ? 'button-'+size : 'button-normal'
    ]"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    kind: {
      type: String,
    },
    size: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onclick(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
