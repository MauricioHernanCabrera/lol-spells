<template>
  <div class="champion" v-show="!isLoading">
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona campeones" />

    <div class="champion__search">
      <label for="champion__search" class="champion__search_label"></label>

      <input
        type="text"
        id="champion__search"
        class="champion__search_input"
        placeholder="Nombre del campeon ..."
        v-model.trim="championName"
      />

      <div class="champion__search_icon">
        <v-icon
          v-show="championName.length > 0"
          size="24"
          color="#f6dea7"
          @click="championName = ''"
        >
          mdi-close
        </v-icon>

        <v-icon
          size="32"
          color="#f6dea7"
          @click="isExpanded = !isExpanded"
          :style="{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
          }"
        >
          mdi-chevron-down
        </v-icon>
      </div>
    </div>

    <v-expand-transition>
      <lol-champion-list
        v-show="
          (championName.length > 0 || isExpanded) &&
          championsFiltered.length > 0
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

    <div
      class="champion__item champion__item--no_items"
      v-show="championName.length > 0 && championsFiltered.length == 0"
    >
      <span class="champion__name">No se encontraron campeones</span>
    </div>

    <div class="champion__floating_button" v-show="hasSelectedChampions">
      <v-btn to="/selected">Ir a la partida</v-btn>
    </div>
  </div>
</template>

<script>
import championsData from "@/const/champions.json";
import { findIndex } from "lodash";
import LolChampionHeader from "@/components/ChampionHeader";
import LolChampionList from "@/components/ChampionList";
import LolChampionItem from "@/components/ChampionItem";

export default {
  name: "Champion",

  components: {
    LolChampionHeader,
    LolChampionList,
    LolChampionItem,
  },

  data() {
    return {
      champions: [],
      championName: "",
      isExpanded: true,
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

.champion__item--no_items {
  justify-content: center;
  min-height: 64px;
}

.champion__floating_button {
  z-index: 10;
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}
</style>