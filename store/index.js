import { findIndex } from "lodash";

export const state = () => ({
  selectedChampions: []
});

export const getters = {};

export const mutations = {
  ADD_SELECTED_CHAMPION: (state, { name, icon, background }) => {
    state.selectedChampions.push({
      name,
      icon,
      background
    });
  },

  REMOVE_SELECTED_CHAMPION: (state, champion) => {
    const championIndex = findIndex(state.selectedChampions, [
      "name",
      champion.name
    ]);
    if (championIndex == -1) {
      return;
    }
    const clone = JSON.parse(JSON.stringify(state.selectedChampions));
    clone.splice(championIndex, 1);
    state.selectedChampions = clone;
  }
};

export const actions = {};
