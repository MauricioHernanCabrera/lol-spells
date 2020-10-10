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
  margin-top: 48px;
  margin-bottom: 12px;
}

.champion__title {
  font-family: $font2;
  text-align: center;
  font-size: 40px;
  line-height: 54px;
  text-transform: uppercase;
}

.champion__subtitle {
  font-family: $font2;
  text-align: center;
  font-size: 50px;
  line-height: 54px;
  display: block;
  color: $color_secondary;
  margin-bottom: 32px;
  text-transform: uppercase;
}
</style>