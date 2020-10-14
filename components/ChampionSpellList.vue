<template>
  <div class="champion__spell_list">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion__spell_list.champion__spell_list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-left: 12px;

  @include breakpoint(sm) {
    margin-left: 24px;
  }
}
</style>