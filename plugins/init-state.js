export default ({ app, store }) => {
  if (process.browser) {
    const { selectedChampions = [] } =
      JSON.parse(localStorage.getItem("data")) || {};
    store.dispatch("setSelectedChampions", selectedChampions);
    store.subscribe(() => {
      localStorage.setItem("data", JSON.stringify(store.state));
    });
  }
};
