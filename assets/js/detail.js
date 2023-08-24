const id = new URLSearchParams(window.location.search).get("id");
console.log("RESOURCE ID: ", id);
const URL = "https://api.pexels.com/v1/photos/";
const authorization = "prkBBF5xpTM3zIJMqUES8iBeECwZWNx2jw66yhRTh6MY2WNwZifecP77";
window.onload = () => {
  getData();
};

const getData = async () => {
  try {
    const resp = await fetch(URL + id, {
      headers: { authorization },
    });

    const data = await resp.json();
    console.log(data);

    const img = document.querySelector("main img");
    img.src = data.src.large;

    const div = document.querySelector(".list-group");
    div.innerHTML = `<div class="list-groupitem">${data.photographer}</div>
    <div class="list-groupitem"><a href="${data.photographer_url}
    ">link</a></div>`;

    document.body.style = `background-color:${data.avg_color}`;
  } catch (error) {
    console.log(error);
  }
};
