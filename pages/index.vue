<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    (() => {
      const championsEl = [
        ...document.querySelectorAll(".champion-container-wrapper"),
      ];

      const champions = championsEl.map((champion) => {
        const backgroundEl = champion.querySelector(
          ".champion-container.d-flex.align-items-center"
        );
        const iconEl = champion.querySelector(".champion-icon.text-center");
        const nameEl = champion.querySelector(".value.champion-name");

        const background = backgroundEl.style.backgroundImage
          .replace('url("', "https:")
          .replace('")', "");
        const icon = iconEl.style.backgroundImage
          .replace('url("', "https:")
          .replace('")', "");
        const name = nameEl.innerText;

        return {
          background,
          icon,
          name,
        };
      });

      console.log(champions);
    })();
  },
};
</script>
