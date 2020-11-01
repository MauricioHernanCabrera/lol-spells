<template>
  <v-app dark class="app">
    <v-toolbar class="elevation-0"  color="#0F0713">
      <v-btn text to="/" v-if="$route.name !== 'index'"> Inicio </v-btn>

      <v-spacer></v-spacer>

      <v-btn text @click="shareGame">
        <span class="hidden-xs-only">Copiar link de partida</span>
        <v-icon class="ml-2">mdi-share-variant-outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <nuxt />
    </v-content>

    <input type="text" value="" class="copy_clipboard" id="copyClipboard" />
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["selectedChampions"]),
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    shareGame() {
      const champions = this.selectedChampions
        .map(({ championId }) => championId)
        .join(",");

      const firstSpells = this.selectedChampions
        .map(({ firstSpell }) => (firstSpell.id ? firstSpell.id : "_"))
        .join(",");

      const secondSpells = this.selectedChampions
        .map(({ secondSpell }) => (secondSpell.id ? secondSpell.id : "_"))
        .join(",");

      const hasBoots = this.selectedChampions
        .map(({ hasBoots }) => (hasBoots ? 1 : 0))
        .join(",");

      const levels = this.selectedChampions.map(({ level }) => level).join(",");

      const route = `${window.location.origin}${this.$router.history.base}/selected?champions=${champions}&firstSpells=${firstSpells}&secondSpells=${secondSpells}&hasBoots=${hasBoots}&levels=${levels}`;

      const copyText = document.getElementById("copyClipboard");
      copyText.value = route;

      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
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

.copy_clipboard {
  position: fixed;
  top: -500vh;
  left: -500vw;
}
</style>
