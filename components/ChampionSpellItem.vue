<template>
  <div
    class="champion__spell_item"
    :class="[
      {
        'champion__spell_item--empty': !championSpellItem.name,
        'champion__spell_item--run': championSpellItem.isRun,
      },
    ]"
    @click="championSpellItem.name ? () => {} : openSpellDialog()"
  >
    <template v-if="championSpellItem.name">
      <v-img
        class="champion__spell_icon"
        :aspect-ratio="1"
        :src="`${$router.history.base}${championSpellItem.icon}`"
        @click="startTimer"
      >
        <div class="champion__spell_duration">
          {{ championSpellItem.duration | time }}
        </div>
      </v-img>

      <v-btn
        text
        x-small
        block
        class="mt-1 champion__spell_open"
        @click="openSpellDialog"
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
import { padStart } from "lodash";

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

  computed: {
    championSpellItem() {
      return this.championItem[this.spellPosition];
    },
  },

  methods: {
    openSpellDialog() {
      this.$emit("open-spell-dialog", {
        championId: this.championItem.id,
        spellPosition: this.spellPosition,
      });
    },

    startTimer() {
      this.$emit("start-timer", {
        championId: this.championItem.id,
        spellPosition: this.spellPosition,
      });
    },
  },

  filters: {
    time(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes}:${padStart(seconds, 2, "0")}`;
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