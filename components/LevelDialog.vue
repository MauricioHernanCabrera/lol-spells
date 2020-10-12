<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-text class="pt-6">
        <lol-level-list>
          <lol-level-item
            v-for="level in 18"
            :key="level"
            :level="level"
            @click="$emit('level-selected', level)"
          >
            {{ level }}
          </lol-level-item>
        </lol-level-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LolLevelList from "@/components/LevelList";
import LolLevelItem from "@/components/LevelItem";
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  components: {
    LolLevelList,
    LolLevelItem,
  },
};
</script>

<style lang="scss" scoped>
</style>