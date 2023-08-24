const apiURL = "https://api.pexels.com/v1/search";
const authorization = "prkBBF5xpTM3zIJMqUES8iBeECwZWNx2jw66yhRTh6MY2WNwZifecP77";

const loadImages = (event, query) => {
  fetch(apiURL + "?query=" + query, {
    headers: { authorization },
  })
    .then(resp => resp.json())
    .then(data => printPhoto(data.photos))
    .catch(err => console.log(err));
};

const queryImages = event => {
  const query = document.querySelector("#query").value;
  loadImages(event, query);
};

const printPhoto = arr => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((elm, index) => {
    elm.id = arr[index].id;
    const svg = elm.querySelector("svg");
    const link = document.createElement("a");
    link.href = "detail.html?id=" + elm.id;

    if (svg) {
      svg.remove();
      const link = document.createElement("a");
      link.href = "detail.html?id=" + elm.id;
      const img = document.createElement("img");
      img.src = arr[index].src.landscape;
      img.style = "width:100%";
      link.appendChild(img);
      elm.insertBefore(link, elm.firstChild);
    } else {
      const link = elm.querySelector("a");
      link.href = "detail.html?id=" + elm.id;
      const img = elm.querySelector("img");
      img.src = arr[index].src.landscape;
    }
    const hide = elm.querySelector("button:last-of-type");
    hide.innerText = "Hide";
    hide.onclick = event => hideCard(event, elm.id);
    elm.querySelector("small").innerText = elm.id;

    const view = elm.querySelector("button");
    view.setAttribute("data-toggle", "modal");
    view.setAttribute("data-targhet", "#exampleModal");
  });
};

const hideCard = (event, id) => document.getElementById(id).parentElement.remove();

document
  .querySelector("main > section > div > p > a:first-child ")
  .addEventListener("click", event => loadImages(event, "car"));
document
  .querySelector("main > section > div > p > a:last-child ")
  .addEventListener("click", event => loadImages(event, "bikini"));

document.querySelector("#button-addon2").addEventListener("click", queryImages);
