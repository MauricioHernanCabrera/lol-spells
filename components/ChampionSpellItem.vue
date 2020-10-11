<template>
  <div
    class="champion__spell_item"
    :class="[
      {
        'champion__spell_item--empty': championItem[spellPosition].name
          ? false
          : true,
      },
      {
        'champion__spell_item--run': championItem[spellPosition].isRun
          ? true
          : false,
      },
    ]"
    @click="
      championItem[spellPosition].name
        ? () => {}
        : $emit('open-spell-modal', championItem, spellPosition)
    "
  >
    <template v-if="championItem[spellPosition].name">
      <v-img
        class="champion__spell_icon"
        :aspect-ratio="1"
        :src="championItem[spellPosition].icon"
        @click="$emit('start-timer', championItem, spellPosition)"
      >
        <div class="champion__spell_duration">
          {{ championItem[spellPosition].duration | time }}
        </div>
      </v-img>

      <v-btn
        text
        x-small
        block
        class="mt-1 champion__spell_open"
        @click="$emit('open-spell-modal', championItem, spellPosition)"
      >
        <v-icon size="16">mdi-pencil-outline</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-icon>mdi-plus</v-icon>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    championItem: {
      type: Object,
      required: true,
    },

    spellPosition: {
      type: String,
      required: true,
    },
  },

  filters: {
    time(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes}:${
        String(seconds).length == 2 ? seconds : `0${seconds}`
      }`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion__spell_item {
  width: 64px;
  min-height: 64px;
  position: relative;
}

.champion__spell_item:not(.champion__spell_item--empty) {
  cursor: pointer;
}

.champion__spell_item:not(.champion__spell_item--run) {
  .champion__spell_duration {
    display: none;
  }
}

.champion__spell_item--run {
  .champion__spell_open {
    pointer-events: none;
    user-select: none;
    opacity: 0;
    cursor: default;
  }
}

.champion__spell_duration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba($color_primary, 0.5);
}

.champion__spell_icon {
  border: 1px solid $color_primary;
}

.champion__spell_item--empty {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
  cursor: pointer;
  border: 1px solid $color_primary;

  &:hover {
    background-color: $color_primary;
  }
}
</style>