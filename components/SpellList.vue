<template>
  <div class="spell__list">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spell__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 12px;
}
</style>