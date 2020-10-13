import { findIndex, find } from "lodash";

export const state = () => ({
  selectedChampions: []
});

export const getters = {};

export const mutations = {
  SET_SELECTED_CHAMPIONS: (state, selectedChampions) => {
    state.selectedChampions = selectedChampions;
  },

  ADD_SELECTED_CHAMPION: (state, champion) => {
    state.selectedChampions.push({
      firstSpell: {},
      secondSpell: {},
      level: 1,
      hasBoots: false,
      interval: null,
      isRun: false,
      ...champion
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
  },

  UPDATE_SELECTED_CHAMPION(state, { championId, champion }) {
    const championIndex = findIndex(state.selectedChampions, [
      "championId",
      championId
    ]);

    if (championIndex == -1) {
      return;
    }

    const clone = JSON.parse(JSON.stringify(state.selectedChampions));
    clone[championIndex] = {
      ...clone[championIndex],
      ...JSON.parse(JSON.stringify(champion))
    };

    state.selectedChampions = clone;
  }
};

export const actions = {
  restartTimer({ state, commit }, { championId, spellPosition }) {
    const championItem = find(state.selectedChampions, [
      "championId",
      championId
    ]);

    const championSpellItem = { ...championItem[spellPosition] };

    clearInterval(championSpellItem.interval);
    championSpellItem.interval = null;
    championSpellItem.isRun = false;
    championSpellItem.duration = championSpellItem.defaultDuration;

    commit("UPDATE_SELECTED_CHAMPION", {
      championId,
      champion: {
        [spellPosition]: championSpellItem
      }
    });
  },

  removeSelectedChampion({ state, commit, dispatch }, championId) {
    const championItem = find(state.selectedChampions, [
      "championId",
      championId
    ]);

    if (championItem.firstSpell) {
      dispatch("restartTimer", { championId, spellPosition: "firstSpell" });
    }

    if (championItem.secondSpell) {
      dispatch("restartTimer", { championId, spellPosition: "secondSpell" });
    }

    commit("REMOVE_SELECTED_CHAMPION", championId);
  },

  startTimer({ state, commit, dispatch }, { championId, spellPosition }) {
    const championItem = find(state.selectedChampions, [
      "championId",
      championId
    ]);

    if (!championItem) {
      return;
    }

    const championSpellItem = JSON.parse(
      JSON.stringify(championItem[spellPosition])
    );

    if (championSpellItem.isRun) {
      dispatch("restartTimer", { championId, spellPosition });
      return;
    }

    let coolDown = 1.0;

    if (championItem.hasBoots) {
      coolDown -= 0.1;
    }

    championSpellItem.isRun = true;
    championSpellItem.duration *= coolDown;

    if (championSpellItem.name == "Teleportación") {
      championSpellItem.duration -= (championItem.level - 1) * 10;
    }

    championSpellItem.duration--;

    championSpellItem.interval = setInterval(() => {
      const championItem = find(state.selectedChampions, [
        "championId",
        championId
      ]);

      const championSpellItem = JSON.parse(
        JSON.stringify(championItem[spellPosition])
      );

      const duration = championSpellItem.duration - 1;

      if (duration <= 0) {
        return dispatch("restartTimer", { championId, spellPosition });
      }

      commit("UPDATE_SELECTED_CHAMPION", {
        championId,
        champion: {
          [spellPosition]: {
            ...championSpellItem,
            duration
          }
        }
      });
    }, 1000);

    commit("UPDATE_SELECTED_CHAMPION", {
      championId,
      champion: {
        [spellPosition]: championSpellItem
      }
    });
  },

  addSelectedChampion({ commit }, champion) {
    commit("ADD_SELECTED_CHAMPION", champion);
  },

  setSelectedChampions({ commit }, selectedChampions) {
    commit("SET_SELECTED_CHAMPIONS", selectedChampions);
  },

  updateSelectedChampion({ commit }, payload) {
    commit("UPDATE_SELECTED_CHAMPION", payload);
  }
};
