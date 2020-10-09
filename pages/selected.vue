<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <pre>{{ selectedChampions }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import championsData from "@/const/champions.json";
import { find } from "lodash";

export default {
  computed: {
    ...mapState(["selectedChampions"]),
  },
};
</script>

<style lang="scss" scoped>
</style>