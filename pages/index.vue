<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <lol-champion />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LolChampion from "@/components/Champion";

export default {
  name: "Home",

  components: {
    LolChampion,
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
</style>
