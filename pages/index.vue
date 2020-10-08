<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <app-champion />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppChampion from "@/components/Champion";

export default {
  name: "Home",

  components: {
    AppChampion,
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
</style>
