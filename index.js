const header = document.getElementById("header");
const categorie = document.getElementById("categorie");
const content = document.getElementById("content");
const contentHidden = document.getElementById("contenthidden");
const reload = document.getElementById("reload");
const btnParam = document.getElementById("paramImg");
const filterBox = document.getElementById("filter");
const filterList = document.getElementById("filterlist");
let lienAPI = "";

function getJoke() {
  btnAnswer.classList.remove("btnShow");
  contentHidden.classList.remove("showanswer");
  if (Oui.checked) {
    lienAPI = "https://api.blablagues.net/?adu=1";
  } else if (Only.checked) {
    lienAPI = "https://api.blablagues.net/?adu=2";
  } else {
    lienAPI = "https://api.blablagues.net/?adu=1/?rub=blagues";
  }
  console.log(lienAPI);
  fetch(lienAPI)
    .then((res) => res.json())
    .then((res2) => {
      const joke = res2.data;
      console.log(joke);
      if (joke.rubrique == "Blagues") {
        categorie.textContent = joke.categorie;
        header.textContent = joke.content.text_head;
        content.textContent = joke.content.text;
        contentHidden.textContent = joke.content.text_hidden;
        if (joke.content.text_hidden !== "") {
          btnAnswer.classList.add("btnShow");
          btnAnswer.addEventListener("click", () => {
            btnAnswer.classList.remove("btnShow");
            contentHidden.classList.add("showanswer");
          });
        }
        // content.textContent =
        //   joke.content.text !== ""
        //     ? joke.content.text
        //     : joke.content.text_hidden;
        // if (joke.content.text !== "" && joke.content.text_hidden !== "") {
        //   content.textContent = joke.content.text;
        //   contentHidden.textContent = joke.content.text_hidden;
        // }
      } else {
        getJoke();
      }
    });
}
getJoke();

reload.addEventListener("click", getJoke);
// function getJoke() {
//     fetch("https://api.blablagues.net/?rub=blagues,images")
//       .then((res) => res.json())
//       .then((res2) => {
//         const joke = res2.data;
//         console.log(res2);
//         categorie.textContent = joke.categorie;
//         header.textContent = joke.content.text_head;
//         if (joke.rubrique == "Images") {
//           imgMedia.src = joke.content.media;
//           console.log(joke.content.media);
//           content.textContent = "";
//         } else {
//           content.textContent =
//             joke.content.text !== ""
//               ? joke.content.text
//               : joke.content.text_hidden;
//           imgMedia.src = "";
//         }
//       });
//   }

btnParam.addEventListener("click", () => {
  filterBox.classList.toggle("hiddenFilter");
  filterList.classList.toggle("listAppear");
  reload.classList.toggle("disabled");
});
