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
          (championName.length > 0 || expanded) && championsFiltered.length > 0
        "
      >
        <lol-champion-item
          v-for="championItem in championsFiltered"
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
      v-show="championName.length > 0 && championsFiltered.length == 0"
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
      champions: [],
      championName: "",
      expanded: true,
      isLoading: true,
      selectedChampions: {},
    };
  },

  mounted() {
    this.selectedChampions =
      JSON.parse(localStorage.getItem("selectedChampions")) || {};

    this.champions = championsData.map((championItem) => {
      const selected = this.selectedChampions.hasOwnProperty(championItem.name);

      return {
        ...championItem,
        selected,
      };
    });

    this.isLoading = false;
  },

  watch: {
    selectedChampions: {
      handler(newValue) {
        localStorage.setItem("selectedChampions", JSON.stringify(newValue));
      },
      deep: true,
    },
  },

  computed: {
    championsFiltered() {
      const championNameLower = this.championName.toLowerCase();

      return this.champions.filter(({ name }) =>
        name.toLowerCase().includes(championNameLower)
      );
    },

    hasSelectedChampions() {
      return this.champions.some(({ selected }) => selected);
    },
  },

  methods: {
    toggleChampion(championName) {
      const championIndex = findIndex(this.champions, ["name", championName]);

      if (championIndex == -1) {
        return;
      }

      const champion = this.champions[championIndex];
      champion.selected = !champion.selected;

      if (champion.selected) {
        this.selectedChampions = {
          ...this.selectedChampions,
          [champion.name]: "_",
        };
        return;
      }

      delete this.selectedChampions[champion.name];
      this.selectedChampions = { ...this.selectedChampions };
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