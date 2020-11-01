import { findIndex, find } from "lodash";
import spellsData from "@/const/spells.json";

export const state = () => ({
  selectedChampions: [],
  championSearch: ""
});

export const getters = {};

export const mutations = {
  SET_SELECTED_CHAMPIONS: (state, selectedChampions) => {
    state.selectedChampions = selectedChampions.map(
      (selectedChampionItem, selectedChampionIndex) => ({
        position: selectedChampionIndex + 1,
        ...selectedChampionItem
      })
    );
  },

  ADD_SELECTED_CHAMPION: (state, champion) => {
    const selectedChampionLength = state.selectedChampions.length;
    const position =
      selectedChampionLength == 0
        ? 1
        : state.selectedChampions[selectedChampionLength - 1].position + 1;

    state.selectedChampions.push({
      firstSpell: {},
      secondSpell: {},
      level: 1,
      hasBoots: false,
      interval: null,
      isRun: false,
      ...champion,
      position
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
  },

  SET_CHAMPION_SEARCH: (state, championSearch) => {
    state.championSearch = championSearch;
  }
};

export const actions = {
  restartTimer({ state, commit }, { championId, spellPosition }) {
    const championItem = find(state.selectedChampions, [
      "championId",
      championId
    ]);

    if (!championItem) {
      return;
    }

    const championSpellItem = { ...championItem[spellPosition] };

    clearInterval(championSpellItem.interval);
    championSpellItem.interval = null;
    championSpellItem.isRun = false;

    const spellItem = find(spellsData, ["id", championSpellItem.id]);

    championSpellItem.duration = spellItem.duration;

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

    if (championItem.firstSpell && championItem.firstSpell.duration) {
      dispatch("restartTimer", { championId, spellPosition: "firstSpell" });
    }

    if (championItem.secondSpell && championItem.secondSpell.duration) {
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
  },

  toggleChampion({ state, dispatch }, championId) {
    const selected = state.selectedChampions.some(
      selectedChampion => selectedChampion.championId === championId
    );

    if (selected) {
      dispatch("removeSelectedChampion", championId);
    } else {
      dispatch("addSelectedChampion", { championId });
    }

    dispatch("setChampionSearch", "");
  },

  setChampionSearch({ commit }, championSearch) {
    commit("SET_CHAMPION_SEARCH", championSearch);
  }
};
