const grid = document.getElementById("grid"), q = document.getElementById("q"), cats = document.getElementById("cats");
let cat = "All"; const all = ["All", ...new Set(L.map((l) => l.cat))];
function draw() {
  cats.innerHTML = all.map((c) => `<span class="chip ${c == cat ? "on" : ""}">${c}</span>`).join("");
  cats.querySelectorAll(".chip").forEach((e) => (e.onclick = () => { cat = e.textContent; draw(); }));
  const t = q.value.toLowerCase();
  grid.innerHTML = L.filter((l) => (cat == "All" || l.cat == cat) && l.title.toLowerCase().includes(t)).map((l) => `<a class="card" href="lesson.html?id=${l.id}"><b>${l.ico}</b><h3>${l.title}</h3><small>${l.cat}</small></a>`).join("") || "<p class='none'>No lessons found.</p>";
}
q.oninput = draw; draw();
