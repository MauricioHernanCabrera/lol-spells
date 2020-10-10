<template>
  <div>
    <lol-champion-header title="LOL SPELLS" subtitle="Selecciona hechizos" />

    <ul class="champion__list" v-show="selectedChampions.length > 0">
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

          <div class="champion__spells">
            <div
              class="champion__spells_item champion__spells_item--first"
              :class="[
                {
                  'champion__spells_item--empty': championItem.firstSpell.name
                    ? false
                    : true,
                },
              ]"
              @click="
                championItem.firstSpell.name
                  ? () => {}
                  : openSpell(championItem, 'firstSpell')
              "
            >
              <template v-if="championItem.firstSpell.name">
                <v-img
                  class="champion__spells_icon"
                  :aspect-ratio="1"
                  :src="championItem.firstSpell.icon"
                ></v-img>

                <v-btn
                  text
                  x-small
                  block
                  class="mt-1"
                  @click="openSpell(championItem, 'firstSpell')"
                >
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                </v-btn>
              </template>

              <template v-else>
                <v-icon>mdi-plus</v-icon>
              </template>
            </div>

            <div
              class="champion__spells_item champion__spells_item--second"
              :class="[
                {
                  'champion__spells_item--empty': championItem.secondSpell.name
                    ? false
                    : true,
                },
              ]"
              @click="
                championItem.secondSpell.name
                  ? () => {}
                  : openSpell(championItem, 'secondSpell')
              "
            >
              <template v-if="championItem.secondSpell.name">
                <v-img
                  class="champion__spells_icon"
                  :aspect-ratio="1"
                  :src="championItem.secondSpell.icon"
                ></v-img>

                <v-btn
                  text
                  x-small
                  block
                  class="mt-1"
                  @click="openSpell(championItem, 'secondSpell')"
                >
                  <v-icon size="16">mdi-pencil-outline</v-icon>
                </v-btn>
              </template>

              <template v-else>
                <v-icon>mdi-plus</v-icon>
              </template>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <v-dialog v-model="dialogSpell.active" width="500">
      <v-card>
        <v-card-text class="pt-6">
          <lol-spell-list>
            <lol-spell-item
              v-for="spellItem in spellsData"
              :key="spellItem.name"
              @click="dialogSpell.handleClick(spellItem)"
              :icon="spellItem.icon"
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
import LolSpellItem from "@/components/SpellItem";
import LolSpellList from "@/components/SpellList";

export default {
  name: "ChampionSelected",

  components: {
    LolChampionHeader,
    LolSpellItem,
    LolSpellList,
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

      this.selectedChampions.splice(championIndex, 1);
    },

    openSpell(championItem, spellKey) {
      const handleClick = (spellItem) => {
        const championIndex = findIndex(this.selectedChampions, [
          "name",
          championItem.name,
        ]);

        if (championIndex == -1) {
          return;
        }

        this.selectedChampions[championIndex][spellKey] = spellItem;
        this.dialogSpell.active = false;
      };

      this.dialogSpell = {
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

.champion__icon:hover ~ .champion__spells {
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

.champion__spells.champion__spells {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-left: 24px;
}

.champion__spells_item {
  width: 64px;
  min-height: 64px;
}

.champion__spells_icon {
  border: 1px solid $color_primary;
}

.champion__spells_item--first {
  margin-right: 12px;
}

.champion__spells_item--empty {
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