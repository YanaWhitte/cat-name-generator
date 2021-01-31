function Search(props) {
  const petName = props.petName;
  const setPetName = props.setPetName;

  return h("div", { className: "search" }, [
    h("input", {
      type: "search",
      placeholder: "search...",
      key: "input",
      onKeyUp: () => {},
    }),
    h("img", { className: "search__icon", src: "img/search.svg", key: "img" }),
    h("div", { className: "search__droplist", key: "div" }),
  ]);
}
