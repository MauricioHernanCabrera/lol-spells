<template>
  <div class="level__list">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.level__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 56px));
  justify-content: center;
  gap: 12px;
}
</style>