<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <lol-champion-header
          title="LOL SPELLS"
          subtitle="Selecciona hechizos"
        />

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
              <div
                :style="{ 'background-image': `url('${championItem.icon}')` }"
                class="champion__icon"
              ></div>

              <span class="champion__name">{{ championItem.name }}</span>
            </div>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import championsData from "@/const/champions.json";
import { find } from "lodash";
import LolChampionHeader from "@/components/ChampionHeader";

export default {
  components: {
    LolChampionHeader,
  },

  computed: {
    ...mapState(["selectedChampions"]),
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
  min-height: 90px;
  display: flex;
  align-items: center;
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

.champion__header {
  margin-top: 48px;
  margin-bottom: 12px;
}

.champion__title {
  font-family: $font2;
  text-align: center;
  font-size: 40px;
  line-height: 54px;
  text-transform: uppercase;
}

.champion__subtitle {
  font-family: $font2;
  text-align: center;
  font-size: 50px;
  display: block;
  color: $color_secondary;
  margin-bottom: 32px;
  text-transform: uppercase;
}
</style>