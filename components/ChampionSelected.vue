<template>
  <div v-show="!isLoading">
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona hechizos" />

    <lol-champion-list v-show="selectedChampions.length > 0">
      <li
        class="champion__item"
        v-for="championItem in selectedChampions"
        :key="championItem.name"
      >
        <div
          :style="{
            'background-image': `url('${$router.history.base}${championItem.background}')`,
          }"
          class="champion__background"
        ></div>

        <div class="champion__info">
          <v-img
            class="champion__icon"
            :aspect-ratio="1"
            :src="`${$router.history.base}${championItem.icon}`"
            @click="removeSelectedChampion(championItem.name)"
          >
          </v-img>

          <span class="champion__name">{{ championItem.name }}</span>

          <div class="spacer"></div>

          <div class="champion__level" @click="openLevelModal(championItem)">
            {{ championItem.level }}
          </div>

          <div
            class="champion__boots"
            :class="[{ 'champion__boots--active': championItem.hasBoots }]"
            @click="championItem.hasBoots = !championItem.hasBoots"
          >
            <v-img
              :src="`${$router.history.base}/images/items/boots.png`"
              aspect-ratio="1"
            ></v-img>
          </div>

          <lol-champion-spell-list>
            <lol-champion-spell-item
              :championItem="championItem"
              spellPosition="firstSpell"
              @start-timer="startTimer"
              @open-spell-modal="openSpellModal"
              class="mr-3"
            />

            <lol-champion-spell-item
              :championItem="championItem"
              spellPosition="secondSpell"
              @start-timer="startTimer"
              @open-spell-modal="openSpellModal"
            />
          </lol-champion-spell-list>
        </div>
      </li>
    </lol-champion-list>

    <lol-champion-no-items v-show="selectedChampions.length == 0">
      No se encontraron campeones
    </lol-champion-no-items>

    <v-dialog v-model="dialogSpell.active" width="500">
      <v-card>
        <v-card-text class="pt-6">
          <lol-spell-list>
            <lol-spell-item
              v-for="spellItem in spellsData"
              :key="spellItem.name"
              :icon="spellItem.icon"
              @click="dialogSpell.handleClick(spellItem)"
            />
          </lol-spell-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLevel.active" width="500">
      <v-card>
        <v-card-text class="pt-6">
          <lol-level-list>
            <div
              class="level__item"
              v-for="level in 18"
              :key="level"
              @click="dialogLevel.handleClick(level)"
            >
              {{ level }}
            </div>
          </lol-level-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { find, findIndex } from "lodash";
import championsData from "@/const/champions.json";
import spellsData from "@/const/spells.json";
import LolChampionHeader from "@/components/ChampionHeader";
import LolChampionList from "@/components/ChampionList";
import LolChampionSpellItem from "@/components/ChampionSpellItem";
import LolChampionSpellList from "@/components/ChampionSpellList";
import LolSpellItem from "@/components/SpellItem";
import LolSpellList from "@/components/SpellList";
import LolChampionNoItems from "@/components/ChampionNoItems";
import LolLevelList from "@/components/LevelList";

export default {
  name: "ChampionSelected",

  components: {
    LolChampionHeader,
    LolSpellItem,
    LolSpellList,
    LolChampionSpellItem,
    LolChampionSpellList,
    LolChampionList,
    LolChampionNoItems,
    LolLevelList,
  },

  data() {
    return {
      isLoading: true,
      spellsData,
      selectedChampions: [],
      dialogLevel: {
        active: false,
        handleClick: () => {},
      },
      dialogSpell: {
        active: false,
        handleClick: () => {},
      },
    };
  },

  mounted() {
    const selectedChampionsKeys = Object.keys(
      JSON.parse(localStorage.getItem("selectedChampions")) || {}
    );

    this.selectedChampions = selectedChampionsKeys.map((key) => ({
      ...find(championsData, ["name", key]),
      firstSpell: {},
      secondSpell: {},
      hasBoots: false,
      level: 1,
      interval: null,
      isRun: false,
    }));

    this.isLoading = false;
  },

  methods: {
    removeSelectedChampion(championName) {
      const championIndex = findIndex(this.selectedChampions, [
        "name",
        championName,
      ]);

      if (championIndex == -1) {
        return;
      }

      if (this.selectedChampions[championIndex].firstSpell) {
        this.restartTimer(this.selectedChampions[championIndex], "firstSpell");
      }

      if (this.selectedChampions[championIndex].firstSpell) {
        this.restartTimer(this.selectedChampions[championIndex], "secondSpell");
      }

      this.selectedChampions.splice(championIndex, 1);

      const selectedChampionsStorage =
        JSON.parse(localStorage.getItem("selectedChampions")) || {};
      delete selectedChampionsStorage[championName];
      localStorage.setItem(
        "selectedChampions",
        JSON.stringify(selectedChampionsStorage)
      );
    },

    openSpellModal(championItem, spellKey) {
      const handleClick = (spellItem) => {
        const championIndex = findIndex(this.selectedChampions, [
          "name",
          championItem.name,
        ]);

        if (championIndex == -1) {
          return;
        }

        this.selectedChampions[championIndex][spellKey] = {
          ...spellItem,
          defaultDuration: spellItem.duration,
        };
        this.dialogSpell.active = false;
      };

      this.dialogSpell = {
        active: true,
        handleClick,
      };
    },

    restartTimer(championItem, spellKey) {
      const item = championItem[spellKey];
      clearInterval(item.interval);
      item.interval = null;
      item.duration = item.defaultDuration;
      item.isRun = false;
    },

    startTimer(championItem, spellKey) {
      const item = championItem[spellKey];

      if (item.isRun) {
        this.restartTimer(championItem, spellKey);
        return;
      }

      if (championItem.hasBoots) {
        item.duration = item.duration * 0.9;
      }

      item.interval = setInterval(() => {
        item.duration--;

        if (item.duration < 0) {
          this.restartTimer(championItem, spellKey);
        }
      }, 1000);

      item.isRun = true;
    },

    openLevelModal(championItem) {
      const handleClick = (level) => {
        const championIndex = findIndex(this.selectedChampions, [
          "name",
          championItem.name,
        ]);

        if (championIndex == -1) {
          return;
        }

        this.selectedChampions[championIndex].level = level;
        this.dialogLevel.active = false;
        console.log(level);
        console.log(championItem);
      };

      this.dialogLevel = {
        active: true,
        handleClick,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/utils.scss";

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
  overflow: hidden;
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
  width: 100%;
}

.champion__icon {
  border: 1px solid $color_primary;
  min-width: 64px;
  max-width: 64px;
  align-self: flex-start;
  cursor: pointer;

  &:hover {
    filter: grayscale(100%);
  }
}

.champion__icon:hover ~ .champion__spell {
  opacity: 0;
}

.champion__name {
  margin-left: 12px;
  font-size: 18px;
  display: none;
  align-self: flex-start;

  @include breakpoint(sm) {
    display: block;
  }
}

.champion__level {
  font-size: 22px;
  font-family: $font2;
  color: $color_secondary;
  border: 1px solid $color_primary;
  height: 32px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.champion__boots {
  min-width: 32px;
  transition: 0.1s;
  filter: grayscale(100%);
  cursor: pointer;
  border: 1px solid $color_primary;
  margin-left: 12px;
}

.champion__boots--active {
  filter: grayscale(0);
}

.level__item {
  color: $color_secondary;
  font-size: 32px;
  font-family: $font2;
  height: 56px;
  border: 1px solid $color_primary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>