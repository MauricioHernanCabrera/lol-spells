<template>
  <v-app dark class="app">
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Vuetify.js",
    };
  },
};
</script>

<style lang="scss">
.app.app.app {
  background-color: #0f0713;
}
</style>
