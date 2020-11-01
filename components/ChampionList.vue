<template>
  <transition-group class="champion__list" tag="ul" name="champion__list">
    <slot />
  </transition-group>
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

.champion__list-move {
  transition: transform 1s;
}
</style>