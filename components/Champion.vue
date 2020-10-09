<template>
  <div class="champion" v-show="!isLoading">
    <div class="champion__header">
      <h1 class="champion__title">
        LOL SPELLS
        <span>Selecciona campeones</span>
      </h1>

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
    </div>

    <v-expand-transition>
      <ul
        class="champion__list"
        v-show="
          (championName.length > 0 || isExpanded) &&
          championsFiltered.length > 0
        "
      >
        <li
          class="champion__item"
          :class="[{ 'champion__item--selected': championItem.selected }]"
          v-for="championItem in championsFiltered"
          :key="championItem.name"
          @click="toggleChampion(championItem)"
        >
          <div
            :style="{ 'background-image': `url('${championItem.background}')` }"
            class="champion__background"
          ></div>

          <div class="champion__info">
            <div
              :style="{ 'background-image': `url('${championItem.icon}')` }"
              class="champion__icon"
            ></div>

            <span class="champion__name">{{ championItem.name }}</span>
          </div>
        </li>
      </ul>
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
import { findIndex, some } from "lodash";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Champion",

  data() {
    return {
      champions: [],
      championName: "",
      isExpanded: true,
      isLoading: true,
    };
  },

  mounted() {
    this.champions = championsData.map((championItem) => {
      const isSelected = some(this.selectedChampions, [
        "name",
        championItem.name,
      ]);

      return {
        ...championItem,
        selected: isSelected,
      };
    });

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

    hasSelectedChampions() {
      return this.champions.some(({ selected }) => selected);
    },
  },

  methods: {
    ...mapMutations(["ADD_SELECTED_CHAMPION", "REMOVE_SELECTED_CHAMPION"]),

    toggleChampion(championItem) {
      const championNameLower = championItem.name.toLowerCase();

      const championIndex = findIndex(this.champions, [
        "name",
        championItem.name,
      ]);

      if (championIndex == -1) {
        return;
      }

      this.champions[championIndex].selected = !this.champions[championIndex]
        .selected;

      if (this.champions[championIndex].selected) {
        this.ADD_SELECTED_CHAMPION(championItem);
      } else {
        this.REMOVE_SELECTED_CHAMPION(championItem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

.champion {
}

.champion__header {
  margin-bottom: 12px;
}

.champion__title {
  font-family: $font2;
  text-align: center;
  margin-top: 48px;
  margin-bottom: 32px;
  font-size: 40px;
  line-height: 54px;
  text-transform: uppercase;

  span {
    font-size: 32px;
    font-size: 50px;
    display: block;
    color: $color_secondary;
  }
}

.champion__search {
  position: relative;
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

.champion__list.champion__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.champion__item {
  position: relative;
  border: 1px solid $color_primary;
  transition: 0.3s;
  cursor: pointer;
  overflow: hidden;
  min-height: 90px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: $color_secondary2;
  }
}

.champion__item--selected {
  border-color: $color_secondary2;

  .champion__background {
    transform: scale(1.1);
  }
}

.champion__item--no_items {
  justify-content: center;
  min-height: 64px;
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

.champion__floating_button {
  z-index: 10;
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}
</style>