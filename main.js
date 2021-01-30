const femaleBtn = document.querySelector(".female-btn");
femaleBtn.addEventListener("click", () => {
  fetch("https://cat-names-api.herokuapp.com/random/female")
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("result").innerHTML = json.name;
    });
});

const maleBtn = document.querySelector(".male-btn");
maleBtn.addEventListener("click", () => {
  fetch("https://cat-names-api.herokuapp.com/random/male")
    .then((response) => response.json())
    .then((json) => {
      document.getElementById("result").innerHTML = json.name;
    });
});

function setName(name) {
  document.querySelector("#result").innerHTML = name;
  search.value = "";
  dropList.classList.remove("active");
}

const search = document.querySelector("input");
const dropList = document.querySelector(".search__droplist");
search.addEventListener("keyup", (event) => {
  const searchValue = event.target.value;

  fetch(
    `https://cat-names-api.herokuapp.com/search/unisex?filter=${searchValue}`
  )
    .then((response) => response.json())
    .then((names) => {
      if (searchValue !== "" && names.length > 0) {
        dropList.classList.add("active");
      } else {
        dropList.classList.remove("active");
      }

      dropList.innerHTML = "";
      for (let name of names) {
        dropList.innerHTML += `
        <p class="search__result" onclick="setName('${name}')">${name}</p>
        `;
      }
    });
});
