export default ({ app, store }) => {
  if (process.browser) {
    const { selectedChampions = [] } =
      JSON.parse(localStorage.getItem("data")) || {};

    selectedChampions.forEach(selectedChampion =>
      store.commit("ADD_SELECTED_CHAMPION", selectedChampion)
    );

    store.subscribe(() => {
      localStorage.setItem("data", JSON.stringify(store.state));
    });
  }
};
