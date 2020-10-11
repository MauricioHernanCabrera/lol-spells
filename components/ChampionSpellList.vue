<template>
  <div class="champion__spell_list">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.champion__spell_list.champion__spell_list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-left: 24px;
}
</style>