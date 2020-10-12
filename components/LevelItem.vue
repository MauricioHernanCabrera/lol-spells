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
@import "./../assets/scss/utils.scss";

.level__item {
  color: $color_secondary;
  font-size: 32px;
  font-family: $font2;
  height: 56px;
  border: 1px solid $color_primary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>