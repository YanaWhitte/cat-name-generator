const root = document.querySelector("#root");
const h = React.createElement;

function Title() {
  return h("h1", { className: "title" }, "Cat Name Generator");
}

function Content() {
  const [petName, setPetName] = React.useState("random name");

  const makeFetchAction = (gender) => {
    return () => {
      fetchData(`random/${gender}`).then((json) => {
        setPetName(json.name);
      });
    };
  };

  return h("div", { className: "content" }, [
    h(Button, {
      key: "male",
      name: "male name",
      onClick: makeFetchAction("male"),
    }),
    h("p", { className: "result", key: "p" }, petName),
    h(Button, {
      key: "female",
      name: "female name",
      onClick: makeFetchAction("female"),
    }),
  ]);
}

function Button(props) {
  return h("div", { className: "btn", onClick: props.onClick }, [
    h("img", { className: "paw", src: "img/paw.svg", key: "img" }),
    h("p", { className: "name", key: "p" }, props.name),
  ]);
}

function Search() {
  return h("div", { className: "search" }, [
    h("input", { type: "search", placeholder: "search...", key: "input" }),
    h("img", { className: "search__icon", src: "img/search.svg", key: "img" }),
    h("div", { className: "search__droplist", key: "div" }),
  ]);
}

ReactDOM.render(
  h("section", { className: "container" }, [
    h(Title, { key: "Title" }),
    h(Content, { key: "Content" }),
    h(Search, { key: "Search" }),
  ]),
  root
);

function fetchData(path) {
  return fetch(`https://cat-names-api.herokuapp.com/${path}`).then((response) =>
    response.json()
  );
}
