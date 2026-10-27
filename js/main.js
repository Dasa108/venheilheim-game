// Venheilheim site: downloads, opening-narration reader, gallery lightbox, menu.
(() => {
  "use strict";

  // Where the builds live. The files are attached to the newest GitHub Release under these fixed names,
  // so a new release needs no change here (only `version` and the sizes, for the labels).
  const RELEASE = {
    repo: "Dasa108/venheilheim-game",
    version: "0.64.8",
    files: {
      windows: { name: "Venheilheim-Windows.zip", size: "417 MB" },
      android: { name: "Venheilheim-Android.apk", size: "408 MB" },
      linux: { name: "Venheilheim-Linux.zip", size: "407 MB" },
    },
  };

  // The Prologue's opening narration, panel by panel, as it plays in the game (assets/comics/prologue_intro).
  const INTRO = [{"text": ["Long ago, before any history that is still told, a great catastrophe tore the world apart.", "No one living remembers what caused it. The few records that survive say little, and the histories that are told have been retold many times."], "img": "img/intro/01_the_breaking.webp"}, {"text": ["What remained was a world divided.", "To the south lie the Sunlit Reaches: green, golden and fertile. It is the land of the Humans.", "To the north stretch the Ashplains of Nul: volcanic, harsh and dark. It is the land of the Uren."], "img": "img/intro/02_two_lands.webp"}, {"text": ["And between them, out on the sea, there is a land no ship has ever reached.", "It hides behind walls of mist that never lift. Sailors who try to pass come back lost, if they come back at all.", "Most people say it is only a legend."], "img": "img/intro/03_beyond_the_mist.webp"}, {"text": ["The Humans of the Sunlit Reaches draw their strength from Aura.", "Aura is an energy that flows through the world around them: in the air, in the earth, in the light.", "In the Sunlit Reaches it is everywhere, as natural as sunshine. But to use it, a Human must first learn to take it in."], "img": "img/intro/04_aura.webp"}, {"text": ["It begins at the skin. Across the body lie intake points, where a trained Human breathes Aura in.", "From there it seeps into the fine meridians: a dense web of tiny channels just beneath the skin.", "The fine meridians feed the primary meridians, the great channels of the body, the way small streams feed a river.", "The primary meridians meet at convergence points...", "...and from there, the Aura sinks into the Aura Core: a reservoir in the lower abdomen.", "From the Core, a warrior can release it through the whole body at will."], "img": "img/intro/05_meridians.webp"}, {"text": ["A Core is not something a Human is born with. It is built, slowly, over years of training.", "A full Core grants strength, speed and endurance far beyond an ordinary person. Knights, guards and Kings all train it from childhood.", "But without a Core, there is nowhere for Aura to go. It cannot be held, and it cannot be used."], "img": "img/intro/06_the_core.webp"}, {"text": ["The Uren of the north are different.", "Their skin is crimson. Horns rise from their heads. And every Uren is born with twin seals, just above the collarbones.", "Their power is called Miasma. The Humans fear it, and do not understand it.", "The Uren are ruled by a Rey, their king.", "In the Human capital, ancient ward stones stand guard. They can sense the twin seals of the Uren.", "No Uren passes them unseen."], "img": "img/intro/07_the_uren.webp"}, {"text": ["The hatred between the two peoples is older than anyone can remember.", "Twenty years ago, it became war.", "The old King of the Sunlit Reaches struck down the Rey of the Uren with his own hand, and the war ended.", "At least, that is what the Humans believe."], "img": "img/intro/08_the_war.webp"}, {"text": ["Since that day, an uneasy peace has held between the two lands.", "No treaty. No trade. Only a border, and two peoples watching each other across it."], "img": "img/intro/09_uneasy_peace.webp"}, {"text": ["Not long ago, the old King passed away peacefully, in his sleep, of old age."], "img": "img/intro/10_the_old_king.webp"}, {"text": ["His son, Eirik, has taken the throne.", "A young King, trained in Aura since he could walk, still learning the weight of the crown.", "And a King with no heir. If anything happened to him, the line would end with him."], "img": "img/intro/11_the_new_king.webp"}, {"text": ["Today, Eirik marries Syra, daughter of one of the realm's great Dukes.", "It is no arranged match. He loves her, and she loves him.", "Every noble house of the realm has come to the palace to celebrate."], "img": "img/intro/12_syra.webp"}, {"text": ["But far to the north, someone has been waiting for this day."], "img": "img/intro/13_the_north_waits.webp"}, {"text": ["It is the morning of the royal wedding.", "This is where your story begins."], "img": "img/intro/14_wedding_morning.webp"}];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------------------------------------------------------------- downloads
  const base = `https://github.com/${RELEASE.repo}/releases`;
  $$("[data-version]").forEach((el) => (el.textContent = RELEASE.version));
  $$("[data-file]").forEach((a) => {
    const f = RELEASE.files[a.dataset.file];
    a.href = `${base}/latest/download/${f.name}`;
    a.setAttribute("download", f.name);
  });
  $$("[data-size]").forEach((el) => (el.textContent = RELEASE.files[el.dataset.size].size));
  $("#all-releases").href = base;

  const ua = navigator.userAgent || "";
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  let os = "";
  if (/android/i.test(ua)) os = "android";
  else if (/iphone|ipad|ipod/i.test(ua) || (/mac/i.test(platform) && navigator.maxTouchPoints > 1)) os = "ios";
  else if (/win/i.test(platform) || /windows/i.test(ua)) os = "windows";
  else if (/mac/i.test(platform)) os = "mac";
  else if (/linux|x11/i.test(platform + ua)) os = "linux";

  const heroBtn = $("#hero-dl");
  const label = { windows: "Download for Windows", android: "Download for Android", linux: "Download for Linux" };
  if (RELEASE.files[os]) {
    const card = $(`.dl[data-os="${os}"]`);
    card.classList.add("mine");
    card.parentElement.prepend(card);
    heroBtn.textContent = label[os];
    heroBtn.href = `${base}/latest/download/${RELEASE.files[os].name}`;
    heroBtn.setAttribute("download", RELEASE.files[os].name);
    $("#hero-note").textContent = `Version ${RELEASE.version} · ${RELEASE.files[os].size} · also on ${Object.keys(label).filter((k) => k !== os).map((k) => k[0].toUpperCase() + k.slice(1)).join(" and ")}`;
  } else if (os === "ios" || os === "mac") {
    const note = $("#os-note");
    note.hidden = false;
    note.textContent = os === "ios"
      ? "There's no iPhone or iPad version yet. You can download the Android or PC version on another device."
      : "There's no macOS version yet. The Windows, Android and Linux versions are below.";
  }

  // ---------------------------------------------------------------- menu and header
  const bar = $(".bar");
  const menuBtn = $(".menu-btn");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------------------------------------------------------------- swipe helper
  function swipe(el, onLeft, onRight) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) (dx < 0 ? onLeft : onRight)();
      x0 = null;
    }, { passive: true });
  }

  // ---------------------------------------------------------------- opening narration reader
  const reader = $("#reader");
  if (reader && INTRO.length) {
    const img = $("#reader-img"), text = $("#reader-text"), count = $("#reader-count"), dots = $("#reader-dots");
    const prev = $("#reader-prev"), next = $("#reader-next");
    let i = 0;
    INTRO.forEach((_, k) => {
      const d = document.createElement("button");
      d.setAttribute("role", "tab");
      d.setAttribute("aria-label", `Panel ${k + 1}`);
      d.addEventListener("click", () => show(k));
      dots.append(d);
    });
    const warm = (k) => { if (INTRO[k]) { const im = new Image(); im.src = INTRO[k].img; } };
    function show(k) {
      if (k < 0 || k >= INTRO.length) return;
      i = k;
      img.classList.add("fading");
      const src = INTRO[k].img;
      const swap = () => { img.src = src; img.alt = INTRO[k].text[0] || ""; };
      setTimeout(() => {
        swap();
        if (img.complete) img.classList.remove("fading");
        else img.onload = () => img.classList.remove("fading");
      }, 180);
      text.replaceChildren(...INTRO[k].text.map((t) => { const p = document.createElement("p"); p.textContent = t; return p; }));
      count.textContent = `${k + 1} / ${INTRO.length}`;
      $$("button", dots).forEach((d, n) => d.setAttribute("aria-selected", String(n === k)));
      prev.disabled = k === 0;
      next.disabled = k === INTRO.length - 1;
      warm(k + 1);
    }
    prev.addEventListener("click", () => show(i - 1));
    next.addEventListener("click", () => show(i + 1));
    reader.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { show(i + 1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { show(i - 1); e.preventDefault(); }
    });
    swipe($(".reader-stage"), () => show(i + 1), () => show(i - 1));
    img.src = INTRO[0].img;
    text.replaceChildren(...INTRO[0].text.map((t) => { const p = document.createElement("p"); p.textContent = t; return p; }));
    count.textContent = `1 / ${INTRO.length}`;
    $$("button", dots).forEach((d, n) => d.setAttribute("aria-selected", String(n === 0)));
    prev.disabled = true;
    // Load the second panel only when the reader comes into view.
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { warm(1); o.disconnect(); } }).observe(reader);
  }

  // ---------------------------------------------------------------- gallery tabs
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => {
    $$(".tabs button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    $("#grid-in-game").hidden = b.dataset.tab !== "in-game";
    $("#grid-comic").hidden = b.dataset.tab !== "comic";
  }));

  // ---------------------------------------------------------------- lightbox
  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap");
  let group = [], at = 0;
  function open(list, k) {
    group = list; at = k;
    render();
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function render() {
    const b = group[at];
    lbImg.src = b.dataset.full;
    lbImg.alt = $("img", b).alt;
    lbCap.textContent = b.dataset.cap || "";
    const n = group[at + 1];
    if (n) { const im = new Image(); im.src = n.dataset.full; }
  }
  const step = (d) => { if (group.length) { at = (at + d + group.length) % group.length; render(); } };
  function close() { if (lb.open && lb.close) lb.close(); else lb.removeAttribute("open"); }
  lb.addEventListener("close", () => { document.body.style.overflow = ""; });
  $$(".shot").forEach((b) => b.addEventListener("click", () => {
    const list = b.closest(".grid") ? $$(".shot", b.closest(".grid")) : $$(".feature .shot");
    open(list, list.indexOf(b));
  }));
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => step(-1));
  $("#lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.tagName === "FIGURE") close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  swipe($("figure", lb), () => step(1), () => step(-1));
})();
