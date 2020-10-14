<template>
  <div class="champion__header">
    <h1 class="champion__title">{{ title }}</h1>
    <span class="champion__subtitle">{{ subtitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion__header {
  margin-top: 24px;
  margin-bottom: 12px;

  @include breakpoint(sm) {
    margin-top: 48px;
  }
}

.champion__title {
  font-family: $font2;
  text-align: center;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;

  @include breakpoint(sm) {
    font-size: 40px;
    line-height: 54px;
  }
}

.champion__subtitle {
  font-family: $font2;
  text-align: center;
  display: block;
  color: $color_secondary;
  margin-bottom: 32px;
  text-transform: uppercase;
  font-size: 32px;
  line-height: 38px;

  @include breakpoint(sm) {
    font-size: 50px;
    line-height: 54px;
  }
}
</style>