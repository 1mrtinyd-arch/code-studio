const $ = (s) => document.querySelector(s), sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const lesson = L[+new URLSearchParams(location.search).get("id")] || L[0];
document.title = lesson.title + " — Code Studio"; $("#ttl").textContent = lesson.ico + " " + lesson.title; $("#sname").textContent = lesson.ico + " " + lesson.title;
let speed = 1, muted = false, run = 0, full = "";

/* ---- sound ---- */
const AC = new (window.AudioContext || window.webkitAudioContext)();
function tone(f, d = .1, ty = "sine", v = .06, at = 0) {
  if (muted || AC.state != "running") return; const t = AC.currentTime + at, o = AC.createOscillator(), g = AC.createGain();
  o.type = ty; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + .02);
}
const key = () => tone(1400 + Math.random() * 400, .025, "square", .012), ding = () => { tone(1320, .15, "sine", .05); tone(1760, .22, "sine", .04, .08); }, win = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .5, "sine", .06, i * .12));

/* ---- syntax highlight (html + embedded css/js) ---- */
const R = {
  js: [/(\/\/.*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(const|let|new|function|return|true|false|if|else|for)\b|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\()/g, ["c", "s", "k", "n", "f"]],
  css: [/(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|((?:[.#][\w-]+|[a-z][\w-]*|@keyframes [\w-]+)(?=[^{};\n]*\{))|([\w-]+(?=\s*:))|(#[0-9a-fA-F]{3,8}\b|\b\d*\.?\d+(?:px|%|s|ms|deg|vh|vw|em)?(?!\w))/g, ["c", "s", "sel", "prop", "n"]],
  html: [/(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w-]*)|(\/?>)|([\w-]+)(?==)|("[^"]*")/g, ["c", "tag", "tag", "attr", "s"]],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function tok(t, lang) {
  const [re, cls] = R[lang]; let o = "", last = 0, m; re.lastIndex = 0;
  while ((m = re.exec(t))) { if (!m[0]) { re.lastIndex++; continue; } o += esc(t.slice(last, m.index)); o += `<span class="t-${cls[m.slice(1).findIndex((v) => v !== undefined)]}">${esc(m[0])}</span>`; last = m.index + m[0].length; }
  return o + esc(t.slice(last));
}
function hl(t) {
  return t.split(/(<style[\s\S]*?(?:<\/style>|$)|<script[\s\S]*?(?:<\/script>|$))/i).map((p) => {
    const m = /^(<(style|script)[^>]*>)([\s\S]*?)(<\/\2>)?$/i.exec(p); if (!m) return tok(p, "html");
    return tok(m[1], "html") + tok(m[3], m[2].toLowerCase() == "style" ? "css" : "js") + (m[4] ? tok(m[4], "html") : "");
  }).join("");
}
function render(t) {
  const lines = hl(t).split("\n").map((l) => `<div class="ln">${l || " "}</div>`); lines[lines.length - 1] = lines[lines.length - 1].replace("</div>", '<span class="caret"></span></div>');
  $("#code").innerHTML = lines.join(""); $("#code").scrollTop = 1e6;
}
const preview = () => { $("#frame").srcdoc = full; $("#live").classList.add("pop"); setTimeout(() => $("#live").classList.remove("pop"), 500); };
function caption(t) { const c = $("#cap"); c.classList.remove("in"); void c.offsetWidth; c.textContent = t; c.classList.add("in"); }

/* ---- the lesson player ---- */
async function play() {
  const me = ++run; full = ""; render(""); $("#frame").srcdoc = "";
  for (let i = 0; i < lesson.chunks.length; i++) {
    const [cap, code] = lesson.chunks[i]; caption(`Step ${i + 1}/${lesson.chunks.length} · ${cap}`);
    for (const ch of code) {
      if (me != run) return; full += ch; render(full);
      if (ch.trim()) key(); if (ch == "\n" && !full.includes("<script")) preview();
      await sleep((ch == "\n" ? 70 : 14) / speed);
    }
    preview(); ding(); await sleep(900 / speed);
  }
  win(); caption("🎉 Done! You built: " + lesson.title + " — copy the code or download it.");
}
$("#go").onclick = () => { AC.resume(); $("#start").classList.add("hide"); play(); };
$("#rep").onclick = () => { AC.resume(); play(); };
$("#spd").onclick = () => { speed = speed == 1 ? 2 : speed == 2 ? 4 : 1; $("#spd").textContent = speed + "x"; };
$("#mute").onclick = () => { muted = !muted; $("#mute").textContent = muted ? "🔇" : "🔊"; };
$("#cpy").onclick = async () => { const all = lesson.chunks.map((c) => c[1]).join(""); try { await navigator.clipboard.writeText(all); caption("📋 Code copied!"); } catch { caption("Select the code and press Ctrl+C"); } };
$("#dl").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([lesson.chunks.map((c) => c[1]).join("")], { type: "text/html" })); a.download = lesson.title.replace(/\W+/g, "-").toLowerCase() + ".html"; a.click(); };
$("#nxt").onclick = () => (location.href = "lesson.html?id=" + ((lesson.id + 1) % L.length));
