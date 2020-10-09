<template>
  <v-app dark class="app">
    <v-app-bar class="elevation-0" fixed app color="transparent">
      <v-icon v-show="$route.name !== 'index'" @click="goBack">
        mdi-chevron-left
      </v-icon>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/_utils.scss";

.app.app {
  background-color: $color_primary2;

  .v-toolbar__content {
    border-bottom: 1px solid $color_primary;
  }
}
</style>
