let maleNames = [];
let unisexNames = [];
let femaleNames = [];

fetch("/json/female.json")
  .then((x) => x.json())
  .then((names) => {
    femaleNames = names;
  });

fetch("/json/unisex.json")
  .then((x) => x.json())
  .then((names) => {
    unisexNames = names;
  });

fetch("/json/male.json")
  .then((x) => x.json())
  .then((names) => {
    maleNames = names;
  });

function pickRandomName(arr) {
  const len = arr.length;
  return new Promise((resolve) => {
    resolve({ name: arr[Math.floor(Math.random() * len)] });
  });
}

function searchName(fragment) {
  return Promise.resolve(
    unisexNames.filter((x) =>
      x.toLowerCase().startsWith(fragment.toLowerCase())
    )
  );
}

function Search(props) {
  const petName = props.petName;
  const setPetName = props.setPetName;
  const [dropListVisible, setDropListVisible] = React.useState(false);
  const [names, setNames] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  return h("div", { className: "search" }, [
    h("input", {
      type: "search",
      placeholder: "search...",
      key: "input",
      value: searchValue,
      onChange: (event) => setSearchValue(event.target.value),
      onKeyUp: (event) => {
        const searchValue = event.target.value;

        searchName(searchValue).then((newNames) => {
          if (searchValue !== "" && newNames.length > 0) {
            setDropListVisible(true);
          } else {
            setDropListVisible(false);
          }

          setNames(newNames);
        });
      },
    }),
    h("img", { className: "search__icon", src: "img/search.svg", key: "img" }),
    h(
      "div",
      {
        className: dropListVisible
          ? "active search__droplist"
          : "search__droplist",
        key: "div",
      },
      names.map((name) =>
        h(
          "p",
          {
            className: "search__result",
            onClick: () => {
              setPetName(name);
              setDropListVisible(false);
              setSearchValue("");
            },
          },
          name
        )
      )
    ),
  ]);
}
