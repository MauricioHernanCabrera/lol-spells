<template>
  <div class="spell__item" v-on="$listeners">
    <v-img class="spell__icon" :aspect-ratio="1" :src="icon"></v-img>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.spell__item {
  width: 100%;
}

.spell__icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 0.1s;
}
</style>