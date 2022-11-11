const header = document.getElementById("Blagueheader");
const categorie = document.getElementById("Blaguecategorie");
const content = document.getElementById("Blaguecontent");
const contentHidden = document.getElementById("Blaguecontenthidden");
const imgheader = document.getElementById("Imagesheader");
const imgcategorie = document.getElementById("Imagescategorie");
const imgcontent = document.getElementById("Imagescontent");
const reload = document.getElementById("reload");
const btnParam = document.getElementById("btnPara");
const filterBox = document.getElementById("filter");
const imageDrole = document.querySelector("img");
let lienAPI = "";
let typeOfJoke = "";

function getJoke() {
  btnAnswer.classList.remove("btnShow");
  contentHidden.classList.remove("showanswer");
  if (Oui.checked) {
    lienAPI = "https://api.blablagues.net/?adu=1";
  } else if (Only.checked) {
    lienAPI = "https://api.blablagues.net/?adu=2";
  } else {
    lienAPI = "https://api.blablagues.net/?adu=1/?rub=blagues,image";
  }
  affichage();
}

getJoke();

reload.addEventListener("click", getJoke);

btnParam.addEventListener("click", () => {
  filterBox.classList.toggle("showFilter");
  btnPara.classList.toggle("cross-btn");
  reload.classList.toggle("disabled");
});

function affichage() {
  if (Blague.checked) {
    document.getElementById("appBlague").classList.remove("notShow");
    document.getElementById("appImages").classList.add("notShow");
    Blagues();
  } else if (Imagejoke.checked) {
    document.getElementById("appBlague").classList.add("notShow");
    document.getElementById("appImages").classList.remove("notShow");
    Images();
  }
}

function Blagues() {
  fetch(lienAPI)
    .then((res) => res.json())
    .then((res2) => {
      const joke = res2.data;
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
      } else {
        getJoke();
      }
    });
}
function Images() {
  fetch(lienAPI)
    .then((res) => res.json())
    .then((res2) => {
      const joke = res2.data;
      console.log(joke);
      if (joke.rubrique == "Images") {
        imgcategorie.textContent = joke.categorie;
        imgheader.textContent = joke.content.text_head;
        imageDrole.src = joke.content.media;
      } else {
        getJoke();
      }
    });
}
