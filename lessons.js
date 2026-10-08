/* All lessons. Each lesson = chunks of [caption, code]. The player types them one by one and refreshes the live preview. */
const L = [], add = (cat, ico, title, chunks) => L.push({ id: L.length, cat, ico, title, chunks });
const HEAD = ["Start an HTML page with a dark, centered background", "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body{margin:0;height:100vh;display:grid;place-items:center;background:#0f172a;overflow:hidden}\n"];
const TAIL = (el, cap = "Close the style and add the element to the body") => [cap, "</style>\n</head>\n<body>\n  " + el + "\n</body>\n</html>"];
const CLOSE = (el) => ["Close the style and add the content to the body", "</style>\n</head>\n<body>\n  " + el + "\n"];
const SCRIPT = (js, cap) => [cap, "  <script>\n" + js + "  </script>\n</body>\n</html>"];
const BASE = "  .shape{\n    width:160px;\n    height:160px;\n    background:#38bdf8;\n    ";

/* ---- Shapes (16 + 3) ---- */
[["Circle", "🔴", "border-radius:50%"], ["Square", "🟦", "border-radius:12px"], ["Rectangle", "▬", "width:260px;height:120px"], ["Oval", "🥚", "width:240px;border-radius:50%"],
 ["Triangle", "🔺", "width:0;height:0;background:none;border-left:90px solid transparent;border-right:90px solid transparent;border-bottom:160px solid #38bdf8"],
 ["Diamond", "🔶", "transform:rotate(45deg);border-radius:10px"], ["Star", "⭐", "clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"],
 ["Pentagon", "⬟", "clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)"], ["Hexagon", "⬢", "clip-path:polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0% 50%)"],
 ["Octagon", "🛑", "clip-path:polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)"], ["Semi-circle", "🌓", "height:80px;border-radius:160px 160px 0 0"],
 ["Arrow", "➡️", "clip-path:polygon(0 30%,60% 30%,60% 0,100% 50%,60% 100%,60% 70%,0 70%)"], ["Cross", "➕", "clip-path:polygon(35% 0,65% 0,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0 65%,0 35%,35% 35%)"],
 ["Ring", "⭕", "background:none;border:24px solid #38bdf8;border-radius:50%;box-sizing:border-box"], ["Gradient Circle", "🌈", "border-radius:50%;background:linear-gradient(135deg,#f472b6,#38bdf8)"],
 ["Parallelogram", "▱", "transform:skew(-20deg)"], ["Trapezoid", "⏢", "clip-path:polygon(20% 0,80% 0,100% 100%,0 100%)"],
 ["Lightning Bolt", "⚡", "background:#facc15;clip-path:polygon(40% 0,100% 0,60% 40%,90% 40%,30% 100%,45% 55%,10% 55%)"], ["Moon", "🌙", "background:transparent;border-radius:50%;box-shadow:-34px 16px 0 0 #facc15"],
].forEach(([n, i, c]) => add("Shapes", i, "Make a " + n, [HEAD, [`Style the shape — the last line turns the box into a ${n.toLowerCase()}`, BASE + c + ";\n  }\n"], TAIL('<div class="shape"></div>')]));

/* ---- Animations (11) ---- */
[["Spin", "🌀", "from{transform:rotate(0)}\n    to{transform:rotate(360deg)}", "2s linear infinite"], ["Bounce", "🏀", "0%,100%{transform:translateY(0)}\n    50%{transform:translateY(-90px)}", "1s ease-in-out infinite"],
 ["Pulse", "💓", "0%,100%{transform:scale(1)}\n    50%{transform:scale(1.35)}", "1.2s ease-in-out infinite"], ["Shake", "📳", "0%,100%{transform:translateX(0)}\n    25%{transform:translateX(-18px)}\n    75%{transform:translateX(18px)}", ".4s infinite"],
 ["Fade", "👻", "0%,100%{opacity:1}\n    50%{opacity:.1}", "2s infinite"], ["Colour Change", "🎨", "0%,100%{background:#38bdf8}\n    50%{background:#f472b6}", "3s infinite"],
 ["3D Flip", "🔄", "from{transform:rotateY(0)}\n    to{transform:rotateY(360deg)}", "2s linear infinite"], ["Slide", "↔️", "0%,100%{transform:translateX(-90px)}\n    50%{transform:translateX(90px)}", "2s ease-in-out infinite"],
 ["Swing", "🪀", "0%,100%{transform:rotate(-25deg)}\n    50%{transform:rotate(25deg)}", "1.5s ease-in-out infinite"], ["Glow", "✨", "0%,100%{box-shadow:0 0 10px #38bdf8}\n    50%{box-shadow:0 0 60px #f472b6}", "2s infinite"],
 ["Grow and Shrink", "🔍", "0%,100%{width:60px;height:60px}\n    50%{width:200px;height:200px}", "2s ease-in-out infinite"],
].forEach(([n, i, kf, a]) => add("Animations", i, n + " animation", [HEAD, ["Make a rounded box to animate", BASE + "border-radius:24px;\n  }\n"],
  ["@keyframes lists the animation steps (0% = start, 100% = end)", `  @keyframes move{\n    ${kf}\n  }\n`], ["animation: name, duration, repeat — now it plays", `  .shape{animation:move ${a}}\n`], TAIL('<div class="shape"></div>')]));

/* ---- Text & UI effects (5) ---- */
const fx = (t, i, cap, css, el, bg) => add("Effects", i, t, [HEAD, [cap, css], TAIL(el)]);
fx("Neon text glow", "💡", "text-shadow stacks glowing layers around the letters", "  h1{color:#fff;font:700 70px system-ui;text-shadow:0 0 10px #0ff,0 0 30px #0ff,0 0 60px #08f}\n", "<h1>NEON</h1>");
fx("Gradient text", "🌈", "Clip a gradient background to the text shape", "  h1{font:800 80px system-ui;background:linear-gradient(90deg,#f472b6,#38bdf8);-webkit-background-clip:text;background-clip:text;color:transparent}\n", "<h1>Gradient</h1>");
fx("Hover button", "👆", "transition smooths the change when the mouse hovers", "  button{padding:16px 36px;font-size:20px;border:0;border-radius:40px;background:#38bdf8;cursor:pointer;transition:.3s}\n  button:hover{transform:scale(1.15);background:#f472b6;box-shadow:0 0 30px #f472b6}\n", "<button>Hover me</button>");
fx("Loading spinner", "⏳", "A circle with one coloured edge, rotating forever", "  .l{width:70px;height:70px;border:8px solid #334155;border-top-color:#38bdf8;border-radius:50%;animation:s 1s linear infinite}\n  @keyframes s{to{transform:rotate(360deg)}}\n", '<div class="l"></div>');
fx("Glass card", "🪟", "backdrop-filter blurs whatever is behind the card", "  body{background:linear-gradient(135deg,#7c3aed,#06b6d4)}\n  .card{padding:40px 50px;border-radius:24px;background:#ffffff30;backdrop-filter:blur(14px);border:1px solid #ffffff60;color:#fff;font:600 28px system-ui}\n", '<div class="card">Glass Card ✨</div>');

/* ---- Love & fun (5) ---- */
fx("Beating heart", "❤️", "A rotated square plus two circles = a heart, then it pulses", "  .heart{position:relative;width:100px;height:100px;background:#ef4444;transform:rotate(-45deg);animation:b 1s infinite}\n  .heart:before,.heart:after{content:'';position:absolute;width:100px;height:100px;background:#ef4444;border-radius:50%}\n  .heart:before{top:-50px;left:0}\n  .heart:after{left:50px;top:0}\n  @keyframes b{50%{transform:rotate(-45deg) scale(1.2)}}\n", '<div class="heart"></div>');
fx("I love you heart code", "💖", "A big message with a heartbeat on the ❤", "  body{background:radial-gradient(#9d174d,#1e1b4b)}\n  h1{color:#fff;font:700 56px Georgia,serif;text-align:center}\n  span{display:inline-block;color:#ef4444;animation:b 1s infinite}\n  @keyframes b{50%{transform:scale(1.4)}}\n", "<h1>I <span>❤</span> You</h1>");
add("Love & Fun", "💞", "Falling hearts", [HEAD, ["Hearts fall from above using a keyframe animation", "  b{position:fixed;top:-40px;font-size:28px;animation:f linear forwards}\n  @keyframes f{to{transform:translateY(110vh)}}\n  h1{color:#fff;font:700 48px system-ui}\n"], CLOSE("<h1>I love you ❤</h1>"),
  SCRIPT('    setInterval(() => {\n      const b = document.createElement("b");\n      b.textContent = "❤";\n      b.style.left = Math.random() * 100 + "vw";\n      b.style.animationDuration = 2 + Math.random() * 3 + "s";\n      document.body.append(b);\n      setTimeout(() => b.remove(), 5000);\n    }, 150);\n', "JavaScript makes a new heart every 150ms at a random spot")]);
add("Love & Fun", "🎂", "Birthday animation", [HEAD, ["Big pulsing text for the greeting", "  body{background:linear-gradient(#312e81,#be185d)}\n  h1{color:#fff;font:700 52px system-ui;text-align:center;animation:p 1s infinite}\n  @keyframes p{50%{transform:scale(1.1)}}\n"],
  ["Balloons: round shapes that float up forever", "  i{position:fixed;bottom:-80px;width:50px;height:64px;border-radius:50%;animation:u linear infinite}\n  i:nth-child(2){left:15%;background:#f472b6;animation-duration:6s}\n  i:nth-child(3){left:40%;background:#facc15;animation-duration:8s}\n  i:nth-child(4){left:65%;background:#38bdf8;animation-duration:7s}\n  i:nth-child(5){left:85%;background:#4ade80;animation-duration:9s}\n  @keyframes u{to{transform:translateY(-120vh)}}\n"],
  TAIL("<h1>Happy Birthday! 🎂</h1>\n  <i></i><i></i><i></i><i></i>")]);
add("Love & Fun", "🎆", "Fireworks", [HEAD, ["Add a canvas — a blank board we draw on with JavaScript", "</style>\n</head>\n<body>\n  <canvas id=\"c\"></canvas>\n"],
  SCRIPT('    const c = document.getElementById("c"), x = c.getContext("2d");\n    c.width = innerWidth; c.height = innerHeight;\n    let p = [];\n    function boom() {\n      const X = Math.random() * c.width, Y = Math.random() * c.height / 2, h = Math.random() * 360;\n      for (let i = 0; i < 60; i++) {\n        const a = Math.PI * 2 * i / 60, s = Math.random() * 4 + 1;\n        p.push({ x: X, y: Y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 60, h });\n      }\n    }\n    setInterval(boom, 700);\n    (function loop() {\n      x.fillStyle = "rgba(0,0,0,.2)"; x.fillRect(0, 0, c.width, c.height);\n      p.forEach(q => { q.x += q.vx; q.y += q.vy; q.vy += .04; q.l--; x.fillStyle = "hsl(" + q.h + ",100%,60%)"; x.fillRect(q.x, q.y, 3, 3); });\n      p = p.filter(q => q.l > 0);\n      requestAnimationFrame(loop);\n    })();\n', "Each burst spawns 60 sparks that fly out, fall and fade")]);

/* ---- Websites (4) ---- */
fx("Landing page", "🌐", "A navbar, a hero headline and a call-to-action button", "  body{display:block;text-align:center;color:#fff;font-family:system-ui}\n  nav{display:flex;justify-content:space-between;padding:20px 40px}\n  .hero{padding:80px 20px}\n  h1{font-size:50px;margin:0}\n  a{display:inline-block;margin-top:24px;padding:14px 32px;border-radius:30px;background:#38bdf8;color:#001;text-decoration:none;font-weight:700}\n",
  '<nav><b>MyBrand</b><span>Home · About · Contact</span></nav>\n  <div class="hero">\n    <h1>Build your dream website</h1>\n    <p>Fast, simple and beautiful.</p>\n    <a href="#">Get Started</a>\n  </div>');
fx("Login form", "🔐", "A card with inputs stacked using CSS grid", "  form{width:280px;padding:30px;border-radius:18px;background:#1e293b;display:grid;gap:14px;color:#fff;font-family:system-ui}\n  input,button{padding:12px;border-radius:10px;border:0;font-size:15px}\n  button{background:#38bdf8;font-weight:700;cursor:pointer}\n",
  '<form>\n    <h2>Welcome back</h2>\n    <input placeholder="Email">\n    <input type="password" placeholder="Password">\n    <button>Log in</button>\n  </form>');
fx("Profile card", "🪪", "An avatar circle, a name and a follow button", "  .card{width:260px;padding:30px;text-align:center;border-radius:22px;background:#1e293b;color:#fff;font-family:system-ui}\n  .av{width:90px;height:90px;margin:0 auto 14px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#38bdf8)}\n  button{margin-top:16px;padding:10px 24px;border:0;border-radius:20px;background:#38bdf8;font-weight:700}\n",
  '<div class="card">\n    <div class="av"></div>\n    <h2>Tinyd</h2>\n    <p>Web Developer</p>\n    <button>Follow</button>\n  </div>');
add("Websites", "🕒", "Digital clock", [HEAD, ["Style the time display", "  h1{color:#38bdf8;font:700 80px monospace;text-shadow:0 0 20px #38bdf8}\n"], CLOSE('<h1 id="t"></h1>'),
  SCRIPT('    setInterval(() => {\n      document.getElementById("t").textContent = new Date().toLocaleTimeString();\n    }, 1000);\n', "Every second JavaScript writes the current time into the heading")]);

/* ---- Games (3) ---- */
add("Games", "🎯", "Catch the circle game", [HEAD, ["A circle to click and a score label", "  #c{position:absolute;width:60px;height:60px;border-radius:50%;background:#f472b6;cursor:pointer}\n  h2{position:fixed;top:10px;left:16px;color:#fff;font-family:system-ui}\n"], CLOSE('<h2>Score: <span id="s">0</span></h2>\n  <div id="c"></div>'),
  SCRIPT('    let n = 0;\n    const c = document.getElementById("c");\n    function move() {\n      c.style.left = Math.random() * (innerWidth - 60) + "px";\n      c.style.top = Math.random() * (innerHeight - 60) + "px";\n    }\n    c.onclick = () => { n++; document.getElementById("s").textContent = n; move(); };\n    move();\n', "Clicking adds a point and teleports the circle")]);
add("Games", "🔢", "Guess the number game", [HEAD, ["Style the game box", "  .g{display:grid;gap:12px;text-align:center;color:#fff;font-family:system-ui}\n  input,button{padding:10px;font-size:18px;border-radius:10px;border:0}\n"],
  CLOSE('<div class="g">\n    <h2>Guess 1 - 10</h2>\n    <input id="i" type="number">\n    <button onclick="go()">Try</button>\n    <p id="m"></p>\n  </div>'),
  SCRIPT('    const t = Math.floor(Math.random() * 10) + 1;\n    function go() {\n      const v = +document.getElementById("i").value;\n      document.getElementById("m").textContent = v == t ? "🎉 Correct!" : v < t ? "Higher ⬆" : "Lower ⬇";\n    }\n', "Pick a secret number, then compare every guess to it")]);
add("Games", "❌", "Tic-Tac-Toe board", [HEAD, ["A 3x3 grid of clickable squares", "  #b{display:grid;grid-template-columns:repeat(3,90px);gap:6px}\n  #b div{height:90px;display:grid;place-items:center;background:#1e293b;color:#fff;font:700 44px system-ui;border-radius:10px;cursor:pointer}\n"], CLOSE('<div id="b"></div>'),
  SCRIPT('    let t = "X";\n    const b = document.getElementById("b");\n    for (let i = 0; i < 9; i++) {\n      const d = document.createElement("div");\n      d.onclick = () => { if (!d.textContent) { d.textContent = t; t = t == "X" ? "O" : "X"; } };\n      b.append(d);\n    }\n', "Build 9 squares in a loop; each click places X or O in turn")]);

/* put template-made lessons into the right category */
const CAT = { "Beating heart": "Love & Fun", "I love you heart code": "Love & Fun", "Landing page": "Websites", "Login form": "Websites", "Profile card": "Websites" };
L.forEach((l) => { if (CAT[l.title]) l.cat = CAT[l.title]; });
