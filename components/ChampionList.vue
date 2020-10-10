<template>
  <ul class="champion__list">
    <slot />
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.champion__list.champion__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>