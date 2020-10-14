<template>
  <div class="champion__search">
    <input
      type="text"
      id="champion__search"
      class="champion__search_input"
      placeholder="Nombre del campeon ..."
      @input="$emit('input', $event.target.value)"
      :value="value"
      autocomplete="off"
    />

    <div class="champion__search_icon">
      <v-icon
        v-show="value.length > 0"
        size="24"
        color="#f6dea7"
        @click="$emit('input', '')"
      >
        mdi-close
      </v-icon>

      <v-icon
        size="32"
        color="#f6dea7"
        @click="$emit('toggle-expanded')"
        :style="{
          transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
        }"
      >
        mdi-chevron-down
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion__search {
  position: relative;
  margin-bottom: 12px;

  @include breakpoint(sm) {
    margin-bottom: 24px;
  }
}

.champion__search_label {
}

.champion__search_input {
  width: 100%;
  color: $color_light;
  border: 1px solid $color_primary;
  padding: 0 18px;
  outline: none;
  height: 48px;

  &:focus {
    border-color: $color_secondary2;
  }

  @include breakpoint(sm) {
    padding: 0 24px;
    height: 64px;
  }
}

.champion__search_icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;

  @include breakpoint(sm) {
    right: 24px;
  }
}
</style>