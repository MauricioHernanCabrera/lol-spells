<template>
  <div v-show="!isLoading">
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona hechizos" />

    <lol-champion-list v-show="selectedChampionsMap.length > 0">
      <li
        class="champion__item"
        v-for="championItem in selectedChampionsMap"
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
            @click="removeSelectedChampion(championItem.championId)"
          >
          </v-img>

          <span class="champion__name">{{ championItem.name }}</span>

          <div class="spacer"></div>

          <div
            class="champion__level"
            @click="openLevelDialog(championItem.id)"
          >
            {{ championItem.level }}
          </div>

          <div
            class="champion__boots"
            :class="[{ 'champion__boots--active': championItem.hasBoots }]"
            @click="toggleBoots(championItem.id)"
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
              @open-spell-dialog="openSpellDialog"
              class="mr-3"
            />

            <lol-champion-spell-item
              :championItem="championItem"
              spellPosition="secondSpell"
              @start-timer="startTimer"
              @open-spell-dialog="openSpellDialog"
            />
          </lol-champion-spell-list>
        </div>
      </li>
    </lol-champion-list>

    <lol-champion-no-items v-show="selectedChampionsMap.length == 0">
      No se encontraron campeones
    </lol-champion-no-items>

    <lol-spell-dialog
      v-model="dialogSpell.active"
      @spell-selected="dialogSpell.handleClick"
    />

    <lol-level-dialog
      v-model="dialogLevel.active"
      @level-selected="dialogLevel.handleClick"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { find, findIndex } from "lodash";
import championsData from "@/const/champions.json";
import spellsData from "@/const/spells.json";

import LolChampionHeader from "@/components/ChampionHeader";
import LolChampionList from "@/components/ChampionList";
import LolChampionSpellItem from "@/components/ChampionSpellItem";
import LolChampionSpellList from "@/components/ChampionSpellList";
import LolChampionNoItems from "@/components/ChampionNoItems";
import LolLevelDialog from "@/components/LevelDialog";
import LolSpellDialog from "@/components/SpellDialog";

export default {
  name: "ChampionSelected",

  components: {
    LolChampionHeader,

    LolChampionSpellItem,
    LolChampionSpellList,
    LolChampionList,
    LolChampionNoItems,
    LolLevelDialog,
    LolSpellDialog,
  },

  data() {
    return {
      isLoading: true,
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

  computed: {
    ...mapState(["selectedChampions"]),

    championsDataObject() {
      return championsData.reduce(
        (ant, act) => ({
          ...ant,
          [act.id]: act,
        }),
        {}
      );
    },

    spellsDataObject() {
      return spellsData.reduce(
        (ant, act) => ({
          ...ant,
          [act.id]: act,
        }),
        {}
      );
    },

    selectedChampionsMap() {
      return this.selectedChampions.map((selectedChampionItem) => ({
        ...selectedChampionItem,
        ...this.championsDataObject[selectedChampionItem.championId],
      }));
    },
  },

  mounted() {
    this.loadSharedChampions();
    this.isLoading = false;
  },

  methods: {
    ...mapActions([
      "restartTimer",
      "removeSelectedChampion",
      "startTimer",
      "updateSelectedChampion",
      "addSelectedChampion",
      "setSelectedChampions",
    ]),

    loadSharedChampions() {
      const {
        champions,
        firstSpells,
        secondSpells,
        hasBoots,
        levels,
      } = this.$route.query;

      const [
        championList,
        firstSpellList,
        secondSpellList,
        hasBootList,
        levelList,
      ] = [
        champions ? champions.split(",") : [],
        firstSpells ? firstSpells.split(",") : [],
        secondSpells ? secondSpells.split(",") : [],
        hasBoots ? hasBoots.split(",") : [],
        levels ? levels.split(",") : [],
      ];

      if (championList.length == 0) {
        return;
      }

      this.setSelectedChampions([]);

      const sharedChampions = championList.map((championId, championIndex) => {
        const [
          firstSpellId,
          secondSpellId,
          firstSpell,
          secondSpell,
          hasBoots,
          level,
        ] = [
          firstSpellList[championIndex],
          secondSpellList[championIndex],
          this.spellsDataObject[firstSpellId] || {},
          this.spellsDataObject[secondSpellId] || {},
          hasBootList[championIndex] == 1 ? true : false,
          levelList[championIndex] ? parseInt(levelList[championIndex]) : 1,
        ];

        return {
          championId,
          firstSpell,
          secondSpell,
          hasBoots,
          level,
        };
      });

      sharedChampions.forEach((sharedChampion) => {
        this.addSelectedChampion(sharedChampion);
      });
    },

    toggleBoots(championId) {
      const championItem = find(this.selectedChampions, [
        "championId",
        championId,
      ]);

      this.updateSelectedChampion({
        championId,
        champion: {
          hasBoots: !championItem.hasBoots,
        },
      });
    },

    openSpellDialog({ championId, spellPosition }) {
      const handleClick = (spellItem) => {
        const championItem = find(this.selectedChampions, [
          "championId",
          championId,
        ]);

        const championSpellItem = { ...spellItem };

        this.updateSelectedChampion({
          championId,
          champion: {
            [spellPosition]: championSpellItem,
          },
        });

        this.dialogSpell.active = false;
      };

      this.dialogSpell = {
        active: true,
        handleClick,
      };
    },

    openLevelDialog(championId) {
      const handleClick = (level) => {
        const championItem = find(this.selectedChampions, [
          "championId",
          championId,
        ]);

        this.updateSelectedChampion({
          championId,
          champion: {
            level,
          },
        });

        this.dialogLevel.active = false;
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
  padding: 6px;
  width: 100%;

  @include breakpoint(sm) {
    padding: 12px;
  }
}

.champion__icon {
  border: 1px solid $color_primary;
  align-self: flex-start;
  cursor: pointer;
  min-width: 48px;
  max-width: 48px;

  @include breakpoint(sm) {
    min-width: 64px;
    max-width: 64px;
  }

  &:hover {
    filter: grayscale(100%);
  }
}

.champion__icon:hover ~ .champion__spell {
  opacity: 0;
}

.champion__name {
  font-size: 18px;
  display: none;
  align-self: flex-start;
  margin-left: 6px;

  @include breakpoint(sm) {
    display: block;
    margin-left: 12px;
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

  @include breakpoint(sm) {
    height: 48px;
    width: 56px;
    font-size: 28px;
  }
}

.champion__boots {
  transition: 0.1s;
  filter: grayscale(100%);
  cursor: pointer;
  border: 1px solid $color_primary;
  margin-left: 6px;
  min-width: 32px;

  @include breakpoint(sm) {
    min-width: 48px;
    margin-left: 12px;
  }
}

.champion__boots--active {
  filter: grayscale(0);
}
</style>