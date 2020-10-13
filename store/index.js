import { findIndex } from "lodash";

export const state = () => ({
  selectedChampions: []
});

export const getters = {};

export const mutations = {
  ADD_SELECTED_CHAMPION: (state, championId) => {
    state.selectedChampions.push({
      championId
    });
  },
  REMOVE_SELECTED_CHAMPION: (state, championId) => {
    const championIndex = findIndex(state.selectedChampions, [
      "championId",
      championId
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
