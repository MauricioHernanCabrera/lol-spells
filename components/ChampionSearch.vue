<template>
  <div class="champion__search">
    <input
      type="text"
      id="champion__search"
      class="champion__search_input"
      placeholder="Nombre del campeon ..."
      @input="$emit('input', $event.target.value)"
      :value="value"
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
  margin-bottom: 24px;
}

.champion__search_label {
}

.champion__search_input {
  width: 100%;
  color: $color_light;
  height: 64px;
  border: 1px solid $color_primary;
  padding: 0 24px;
  outline: none;

  &:focus {
    border-color: $color_secondary2;
  }
}

.champion__search_icon {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>