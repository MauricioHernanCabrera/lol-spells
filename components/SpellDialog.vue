<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-text class="pt-6">
        <lol-spell-list>
          <lol-spell-item
            v-for="spellItem in spellsData"
            :key="spellItem.name"
            :icon="spellItem.icon"
            @click="$emit('spell-selected', spellItem)"
          />
        </lol-spell-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LolSpellItem from "@/components/SpellItem";
import LolSpellList from "@/components/SpellList";
import spellsData from "@/const/spells.json";

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    LolSpellItem,
    LolSpellList,
  },

  data() {
    return {
      spellsData,
    };
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
};
</script>

<style lang="scss" scoped>
</style>