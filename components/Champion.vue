<template>
  <div class="champion" v-show="!isLoading">
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona campeones" />

    <lol-champion-search
      v-model="championName"
      :expanded="expanded"
      @toggle-expanded="expanded = !expanded"
    />

    <v-expand-transition>
      <lol-champion-list
        v-show="
          (championName.length > 0 || expanded) && championsMap.length > 0
        "
      >
        <lol-champion-item
          v-for="championItem in championsMap"
          :key="championItem.name"
          :selected="championItem.selected"
          :background="championItem.background"
          :icon="championItem.icon"
          :name="championItem.name"
          @toggle-champion="toggleChampion"
        >
        </lol-champion-item>
      </lol-champion-list>
    </v-expand-transition>

    <lol-champion-no-items
      v-show="championName.length > 0 && championsMap.length == 0"
    >
      No se encontraron campeones
    </lol-champion-no-items>

    <div class="champion__floating_button" v-show="hasSelectedChampions">
      <v-btn to="/selected">Ir a la partida</v-btn>
    </div>
  </div>
</template>

<script>
import championsData from "@/const/champions.json";
import { findIndex } from "lodash";
import LolChampionHeader from "@/components/ChampionHeader";
import LolChampionSearch from "@/components/ChampionSearch";
import LolChampionList from "@/components/ChampionList";
import LolChampionItem from "@/components/ChampionItem";
import LolChampionNoItems from "@/components/ChampionNoItems";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Champion",

  components: {
    LolChampionHeader,
    LolChampionSearch,
    LolChampionList,
    LolChampionItem,
    LolChampionNoItems,
  },

  data() {
    return {
      champions: championsData,
      championName: "",
      expanded: true,
      isLoading: true,
    };
  },

  mounted() {
    this.isLoading = false;
  },

  computed: {
    ...mapState(["selectedChampions"]),

    championsFiltered() {
      const championNameLower = this.championName.toLowerCase();

      return this.champions.filter(({ name }) =>
        name.toLowerCase().includes(championNameLower)
      );
    },

    championsMap() {
      return this.championsFiltered.map((championItem) => ({
        ...championItem,
        selected: this.selectedChampions.some(
          (selectedChampionId) =>
            selectedChampionId.championId == championItem.id
        ),
      }));
    },

    hasSelectedChampions() {
      return this.champions.some(({ selected }) => selected);
    },
  },

  methods: {
    ...mapMutations(["ADD_SELECTED_CHAMPION", "REMOVE_SELECTED_CHAMPION"]),

    toggleChampion(championName) {
      const championIndex = findIndex(this.champions, ["name", championName]);

      if (championIndex == -1) {
        return;
      }

      const champion = this.champions[championIndex];
      champion.selected = !champion.selected;

      if (champion.selected) {
        this.ADD_SELECTED_CHAMPION(champion.id);
        return;
      }

      this.REMOVE_SELECTED_CHAMPION(champion.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion {
}

.champion__floating_button {
  z-index: 10;
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}
</style>