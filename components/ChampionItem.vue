<template>
  <li
    class="champion__item"
    :class="[{ 'champion__item--selected': selected }]"
    @click="$emit('toggle-champion', name)"
  >
    <div
      :style="{
        'background-image': `url('${$router.history.base}${background}')`,
      }"
      class="champion__background"
    ></div>

    <div class="champion__info">
      <div
        :style="{ 'background-image': `url('${$router.history.base}${icon}')` }"
        class="champion__icon"
      ></div>

      <span class="champion__name">{{ name }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion__item {
  position: relative;
  border: 1px solid $color_primary;
  transition: 0.3s;
  cursor: pointer;
  overflow: hidden;
  min-height: 90px;
  display: flex;
  align-items: center;
}

.champion__item--selected {
  border-color: $color_secondary2;

  .champion__background {
    transform: scale(1.1);
  }
}

.champion__background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-position: top center;
  object-fit: cover;
  z-index: 1;
  transition: 0.1s;
}

.champion__info {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 12px;
}

.champion__icon {
  border: 1px solid $color_primary;
  height: 64px;
  width: 64px;
}

.champion__name {
  margin-left: 12px;
  font-size: 18px;
}
</style>