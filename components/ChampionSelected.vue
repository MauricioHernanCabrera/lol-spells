<template>
  <div>
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona hechizos" />

    <lol-champion-list v-show="selectedChampions.length > 0">
      <li
        class="champion__item"
        v-for="championItem in selectedChampions"
        :key="championItem.name"
      >
        <div
          :style="{
            'background-image': `url('${championItem.background}')`,
          }"
          class="champion__background"
        ></div>

        <div class="champion__info">
          <v-img
            class="champion__icon"
            :aspect-ratio="1"
            :src="championItem.icon"
            @click="removeSelectedChampion(championItem.name)"
          >
          </v-img>

          <span class="champion__name">{{ championItem.name }}</span>

          <div class="spacer"></div>

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
              :icon="`${$router.history.base}${spellItem.icon}`"
              @click="dialogSpell.handleClick(spellItem)"
            />
          </lol-spell-list>
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
  },

  data() {
    return {
      spellsData,
      selectedChampions: [],
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
    }));
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
          interval: null,
          isRun: false,
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

      item.interval = setInterval(() => {
        item.duration--;

        if (item.duration < 0) {
          this.restartTimer(championItem, spellKey);
        }
      }, 1000);

      item.isRun = true;
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
</style>