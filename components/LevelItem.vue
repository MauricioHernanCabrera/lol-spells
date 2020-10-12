<template>
  <div class="level__item" v-on="$listeners">
    {{ level }}
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.level__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 56px));
  justify-content: center;
  gap: 12px;
}
</style>