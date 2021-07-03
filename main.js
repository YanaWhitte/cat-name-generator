const root = document.querySelector("#root");
const h = React.createElement;

function Title() {
  return h("h1", { className: "title" }, "Cat Name Generator");
}

function Content(props) {
  const petName = props.petName;
  const setPetName = props.setPetName;

  const makeFetchAction = (gender) => {
    return () => {
      pickRandomName(gender === "male" ? maleNames : femaleNames).then(
        (json) => {
          setPetName(json.name);
        }
      );
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

function App() {
  const [petName, setPetName] = React.useState("random name");
  return h("section", { className: "container" }, [
    h(Title, { key: "Title" }),
    h(Content, { key: "Content", petName: petName, setPetName: setPetName }),
    h(Search, { key: "Search", petName: petName, setPetName: setPetName }),
  ]);
}

ReactDOM.render(h(App), root);
