<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <lol-champion-selected />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LolChampionSelected from "@/components/ChampionSelected";

export default {
  name: "Selected",

  components: {
    LolChampionSelected,
  },
};
</script>

<style lang="scss" scoped>
</style>