// ---------- séries ----------
TOPICS.forEach(t => {
  const base = t.items && t.items.length ? [{ id: "base", title: EXTRA_SETS[t.id] ? "L'essentiel" : "Exercices", desc: "Les points clés du chapitre.", items: t.items }] : [];
  t.sets = base.concat(EXTRA_SETS[t.id] || []);
  t.count = t.sets.reduce((n, s) => n + s.items.length, 0);
});
const RUN_MAX = 15;

// ---------- état ----------
const KEY = "francais-a2-v1";
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {} }
};
let P = store.get();               // { last, view, sel: {tid: setId}, t: { tid: { setId: { r: {idx: 1|0}, best, runs } } } }
P.t = P.t || {}; P.sel = P.sel || {};
let view = P.view === "rules" ? "rules" : "ex";
const sp = (tid, sid) => { const t = (P.t[tid] = P.t[tid] || {}); return (t[sid] = t[sid] || { r: {}, best: 0, runs: 0 }) };
const save = () => store.set(P);

function setStats(tid, s) {
  const r = ((P.t[tid] || {})[s.id] || {}).r || {};
  const done = Object.keys(r).length, ok = Object.values(r).filter(v => v === 1).length;
  return { done, ok, n: s.items.length, state: ok === s.items.length ? 2 : done ? 1 : 0 };
}
function topicStats(t) {
  let done = 0, ok = 0;
  t.sets.forEach(s => { const x = setStats(t.id, s); done += x.done; ok += x.ok });
  return { done, ok, n: t.count, state: ok === t.count ? 2 : done ? 1 : 0 };
}
const totalEx = TOPICS.reduce((n, t) => n + t.count, 0);

// ---------- utilitaires ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
const plain = s => String(s).replace(/\*\*?/g, "");
const norm = s => s.toLowerCase().replace(/[’`]/g, "'").replace(/…/g, "...").replace(/\s+/g, " ").replace(/\s*'\s*/g, "'").replace(/\s*([?!.,;:])/g, "$1").replace(/[.!?;,]+$/, "").trim();
const strip = s => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");
const fold = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
const numLabel = t => t.label || (t.sub ? `19.${t.sub}` : t.id);
const byId = id => TOPICS.find(t => t.id === id);
function qHTML(q, filled) {
  if (!q.includes("___")) return md(q);
  const [a, b] = q.split("___");
  return md(a) + (filled != null ? `<span class="filled">${esc(filled)}</span>` : `<span class="blank">&nbsp;</span>`) + md(b);
}
const GROUPS = [["base", "Fondamentaux A1–A2"], ["gram", "Cours A2"], ["idiom", "Idiomes et structures"]];
const groupOf = t => t.group || (t.sub ? "idiom" : "gram");
function chapLabel(t) { return groupOf(t) === "base" ? "Fondamentaux A1–A2" : t.label ? "Fiche de grammaire" : t.sub ? "19." + t.sub + " · Idiomes et structures" : "Chapitre " + t.id }
const KIND = { mc: "Choisis la bonne réponse", fill: "Complète", tr: "Écris la phrase", ord: "Remets dans l'ordre", match: "Associe" };

// ---------- recherche ----------
const INDEX = [];
TOPICS.forEach(t => {
  let sec = -1, secTitle = "";
  (BOOK[t.id] || []).forEach(b => {
    if (b.h) { sec++; secTitle = b.h; INDEX.push({ t, sec, secTitle, text: b.h }); return }
    const txt = typeof b === "string" ? b : b.ul ? b.ul.join(" · ") : b.table ? b.table.map(r => r.join(" | ")).join(" · ") : b.ex ? b.ex.join(" — ") : b.warn || b.tip || "";
    INDEX.push({ t, sec, secTitle, text: plain(txt) });
  });
  INDEX.push({ t, sec: -1, secTitle: "", text: t.title });
});
function search(q) {
  const words = fold(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const seen = new Set(), out = [];
  for (const e of INDEX) {
    const f = fold(e.text);
    if (!words.every(w => f.includes(w))) continue;
    const k = e.t.id + "|" + e.sec + "|" + e.text.slice(0, 40);
    if (seen.has(k)) continue; seen.add(k);
    out.push(e); if (out.length >= 60) break;
  }
  return out;
}
function snippet(text, q) {
  const ws = fold(q).split(/\s+/).filter(Boolean), w = ws[0] || "";
  const f = fold(text), i = Math.max(0, f.indexOf(w));
  const start = Math.max(0, i - 50), end = Math.min(text.length, i + w.length + 80);
  let html = esc((start ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : ""));
  ws.forEach(word => {
    const fs = fold(html), out = [];
    let pos = 0, idx;
    while ((idx = fs.indexOf(word, pos)) !== -1) { out.push(html.slice(pos, idx), "<mark>", html.slice(idx, idx + word.length), "</mark>"); pos = idx + word.length }
    if (out.length) html = out.join("") + html.slice(pos);
  });
  return html;
}

// ---------- rail ----------
const rail = document.getElementById("rail");
let query = "";
function renderRail(current) {
  const row = t => {
    const s = topicStats(t);
    return `<button class="topic" data-id="${t.id}" aria-current="${t.id === current}">
      <span class="num">${numLabel(t)}</span>
      <span class="name">${view === "ex" ? `<span class="state s${s.state}"></span>` : ""}${esc(t.title)}</span>
      <span class="score">${view === "ex" ? `${s.ok}/${s.n}` : `${(BOOK[t.id] || []).filter(b => b.h).length} §`}</span>
      ${view === "ex" ? `<span class="meter"><span style="width:${s.ok / s.n * 100}%"></span></span>` : ""}</button>`;
  };
  const searchBox = view === "rules" ? `<div class="search"><input id="q" type="search" placeholder="Chercher une règle : accord, depuis, en…" aria-label="Chercher dans les règles" value="${esc(query)}"></div>` : "";
  let list;
  if (view === "rules" && query.trim()) {
    const hits = search(query);
    list = hits.length ? hits.map(h => `<button class="hit" data-id="${h.t.id}" data-sec="${h.sec}">
        <span class="where">${esc(numLabel(h.t))} · ${esc(h.t.title)}${h.secTitle ? " › " + esc(h.secTitle) : ""}</span>
        <span class="snip">${snippet(h.text, query)}</span></button>`).join("")
      : `<p class="hint">Aucun résultat pour « ${esc(query)} ». Essaie un autre mot (les accents ne comptent pas).</p>`;
  } else {
    list = GROUPS.map(([g, label]) => `<h2>${label}</h2>${TOPICS.filter(t => groupOf(t) === g).map(row).join("")}`).join("");
  }
  rail.innerHTML = searchBox + `<div id="railList">${list}</div>`;
  rail.querySelectorAll(".topic").forEach(b => b.onclick = () => go(b.dataset.id));
  rail.querySelectorAll(".hit").forEach(b => b.onclick = () => { pendingSec = +b.dataset.sec; if (location.hash === "#r-" + b.dataset.id) route(); else location.hash = "r-" + b.dataset.id });
  const qi = document.getElementById("q");
  if (qi) qi.addEventListener("input", () => {
    query = qi.value;
    const pos = qi.selectionStart;
    renderRail(current);
    const n = document.getElementById("q"); n.focus(); n.setSelectionRange(pos, pos);
  });
  const all = TOPICS.map(topicStats);
  const ok = all.reduce((n, s) => n + s.ok, 0);
  document.getElementById("statTopics").textContent = `${all.filter(s => s.state === 2).length}/${TOPICS.length}`;
  document.getElementById("statEx").textContent = `${ok}/${totalEx}`;
  document.getElementById("overallBar").style.width = (ok / totalEx * 100) + "%";
}
function go(id) { location.hash = (view === "rules" ? "r-" : "t-") + id }

// ---------- vue Règles ----------
const main = document.getElementById("main");
let cur = null, curSet = null, run = null, pendingSec = null;

function blockHTML(b, k) {
  if (typeof b === "string") return `<p>${md(b)}</p>`;
  if (b.h) return `<h3 id="sec-${k}">${md(b.h)}</h3>`;
  if (b.ul) return `<ul>${b.ul.map(li => `<li>${md(li)}</li>`).join("")}</ul>`;
  if (b.ex) return `<div class="ex"><span>${md(b.ex[0])}</span><i>${md(b.ex[1])}</i></div>`;
  if (b.warn) return `<div class="warn">${md(b.warn)}</div>`;
  if (b.tip) return `<div class="tip">${md(b.tip)}</div>`;
  if (b.table) {
    const hasHead = b.table.length > 2 || b.table[0][0] === "";
    return `<div class="tbl"><table>${b.table.map((row, i) => `<tr>${row.map(c => i === 0 && hasHead ? `<th>${md(c)}</th>` : `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
  }
  return "";
}
function ruleHTML(t) {
  if (!t.rule) { // rappel = début de la fiche, jusqu'au 2e titre
    const b = BOOK[t.id] || [], out = [];
    let heads = 0;
    for (const x of b) { if (x.h && ++heads > 2) break; out.push(x) }
    return out.map(blockHTML).join("");
  }
  return t.rule.map(r => {
    if (typeof r === "string") return `<p>${md(r)}</p>`;
    if (r.ex) return `<div class="ex"><span>${md(r.ex[0])}</span><i>${md(r.ex[1])}</i></div>`;
    if (r.table) return `<div class="tbl"><table>${r.table.map((row, i) => `<tr>${row.map(c => i === 0 && r.table[0][0] === "" ? `<th>${esc(c)}</th>` : `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
    return "";
  }).join("");
}
function pager(t, prefix) {
  const i = TOPICS.indexOf(t), prev = TOPICS[i - 1], next = TOPICS[i + 1];
  return `<div class="pager">
    ${prev ? `<a class="ghost" href="#${prefix}-${prev.id}">← ${esc(numLabel(prev))} ${esc(prev.title)}</a>` : "<span></span>"}
    ${next ? `<a class="ghost" href="#${prefix}-${next.id}">${esc(numLabel(next))} ${esc(next.title)} →</a>` : ""}</div>`;
}
function openRules(id) {
  cur = byId(id) || TOPICS[0];
  P.last = cur.id; save();
  document.body.classList.add("in-topic");
  const book = BOOK[cur.id] || [];
  const heads = book.map((b, k) => b.h ? { k, h: b.h } : null).filter(Boolean);
  const s = topicStats(cur);
  main.innerHTML = `<button class="back" id="back">← Chapitres et recherche</button>
    <div class="chap-head"><span class="label">${esc(chapLabel(cur))} · Fiche de règles</span><h2>${esc(cur.title)}</h2></div>
    ${heads.length > 1 ? `<nav class="toc" aria-label="Sections">${heads.map(x => `<button data-k="${x.k}">${md(x.h)}</button>`).join("")}</nav>` : ""}
    <article class="book">${book.map(blockHTML).join("")}</article>
    <div class="actions"><a class="primary" href="#t-${cur.id}">S'entraîner : ${cur.count} exercices${cur.sets.length > 1 ? ` en ${cur.sets.length} séries` : ""}${s.done ? ` (${s.ok} réussis)` : ""}</a></div>
    ${pager(cur, "r")}`;
  document.getElementById("back").onclick = () => { location.hash = "" };
  main.querySelectorAll(".toc button").forEach(b => b.onclick = () => document.getElementById("sec-" + b.dataset.k).scrollIntoView({ behavior: "smooth", block: "start" }));
  renderRail(cur.id);
  if (pendingSec != null && pendingSec >= 0 && heads[pendingSec]) {
    const el = document.getElementById("sec-" + heads[pendingSec].k);
    requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  } else window.scrollTo({ top: 0 });
  pendingSec = null;
}

// ---------- vue Exercices ----------
function openTopic(id) {
  cur = byId(id) || TOPICS[0];
  P.last = cur.id; save();
  document.body.classList.add("in-topic");
  const s = topicStats(cur);
  const pick = cur.sets.find(x => x.id === P.sel[cur.id]) || cur.sets.find(x => setStats(cur.id, x).state < 2) || cur.sets[0];
  main.innerHTML = `<button class="back" id="back">← Chapitres</button>
    <div class="chap-head"><span class="label">${esc(chapLabel(cur))}</span><h2>${esc(cur.title)}</h2></div>
    <details class="rule" ${s.done ? "" : "open"}><summary>Rappel de la règle</summary><div class="rule-body">${ruleHTML(cur)}
      <a class="ghost" href="#r-${cur.id}" style="align-self:flex-start">Lire la fiche complète</a></div></details>
    ${cur.sets.length > 1 ? `<div class="sets" id="sets" role="list"></div>` : ""}
    <section class="drill" id="drill" aria-live="polite"></section>`;
  document.getElementById("back").onclick = () => { location.hash = "" };
  selectSet(pick.id);
  renderRail(cur.id);
  window.scrollTo({ top: 0 });
}
function renderSets() {
  const el = document.getElementById("sets");
  if (!el) return;
  el.innerHTML = cur.sets.map(s => {
    const x = setStats(cur.id, s);
    const kinds = [...new Set(s.items.map(i => i.t))].map(k => KIND[k]).join(" · ");
    return `<button class="setcard" role="listitem" data-id="${s.id}" aria-pressed="${s === curSet}">
      <span class="st-title"><span class="state s${x.state}"></span>${esc(s.title)}</span>
      <span class="st-desc">${esc(s.desc || "")}</span>
      <span class="st-meta">${x.ok}/${x.n} · ${esc(kinds)}</span>
      <span class="meter"><span style="width:${x.ok / x.n * 100}%"></span></span></button>`;
  }).join("");
  el.querySelectorAll(".setcard").forEach(b => b.onclick = () => { selectSet(b.dataset.id); document.getElementById("drill").scrollIntoView({ behavior: "smooth", block: "start" }) });
}
function selectSet(sid) {
  curSet = cur.sets.find(s => s.id === sid) || cur.sets[0];
  P.sel[cur.id] = curSet.id; save();
  renderSets();
  startRun(pickOrder(curSet));
}
function pickOrder(s) {
  const r = sp(cur.id, s.id).r;
  const idx = s.items.map((_, i) => i);
  if (idx.length <= RUN_MAX) return idx;
  const rank = i => r[i] === undefined ? 0 : r[i] === 0 ? 1 : 2;
  return shuffle(idx).sort((a, b) => rank(a) - rank(b)).slice(0, RUN_MAX);
}
function startRun(order) { run = { order, pos: 0, results: [], opts: null }; renderQ() }

function renderQ() {
  const d = document.getElementById("drill");
  if (run.pos >= run.order.length) return renderSummary();
  const idx = run.order[run.pos], it = curSet.items[idx];
  const title = cur.sets.length > 1 ? `<span class="label">${esc(curSet.title)}${curSet.items.length > RUN_MAX ? ` · série de ${run.order.length} sur ${curSet.items.length}` : ""}</span>` : "";
  const prog = `${title}<div class="drill-top"><div class="meter"><span style="width:${run.pos / run.order.length * 100}%"></span></div><span class="count">${run.pos + 1} / ${run.order.length}</span></div>`;
  const head = `<div class="kind">${KIND[it.t]}</div><div class="q" id="qtext">${qHTML(it.q)}</div>${it.en ? `<div class="q-en">${md(it.en)}</div>` : ""}`;
  const fbAct = `<div id="fb"></div><div class="actions" id="act"></div>`;
  if (it.t === "mc") {
    run.opts = shuffle(it.a.concat(it.o));
    d.innerHTML = `${prog}${head}<div class="opts">${run.opts.map((o, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>${fbAct}`;
    d.querySelectorAll(".opt").forEach(b => b.onclick = () => answerMC(+b.dataset.i));
    d.querySelector(".opt").focus({ preventScroll: true });
  } else if (it.t === "ord") {
    run.bank = shuffle(it.tokens.map((w, i) => ({ w, i })));
    if (run.bank.map(x => x.w).join(" ") === it.tokens.join(" ")) run.bank.reverse();
    run.line = [];
    d.innerHTML = `${prog}${head}<div class="line" id="line" aria-label="Ta phrase"></div><div class="bank" id="bank"></div>
      <div class="actions"><button class="primary" id="check" disabled>Vérifier</button><button class="ghost" id="clear">Effacer</button></div>${fbAct}`;
    drawOrd();
    document.getElementById("check").onclick = answerOrd;
    document.getElementById("clear").onclick = () => { run.bank = run.bank.concat(run.line); run.line = []; drawOrd() };
  } else if (it.t === "match") {
    run.right = shuffle(it.pairs.map(p => p[1]));
    d.innerHTML = `${prog}${head}<div class="pairs-q">${it.pairs.map((p, i) => `<label class="pair-row"><span>${esc(p[0])}</span>
      <select id="m${i}" data-i="${i}"><option value="">…</option>${run.right.map(r => `<option>${esc(r)}</option>`).join("")}</select></label>`).join("")}</div>
      <div class="actions"><button class="primary" id="check">Vérifier</button></div>${fbAct}`;
    document.getElementById("check").onclick = answerMatch;
    document.getElementById("m0").focus({ preventScroll: true });
  } else {
    d.innerHTML = `${prog}${head}
      <div class="fill-row"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ta réponse" placeholder="${it.t === "tr" ? "Écris toute la phrase…" : "Ta réponse…"}"><button class="primary" id="check">Vérifier</button></div>
      <div class="accents">${["é","è","ê","à","â","ù","û","ç","î","ô","œ","…"].map(c => `<button type="button" tabindex="-1" data-c="${c}">${c}</button>`).join("")}</div>${fbAct}`;
    const inp = document.getElementById("ans");
    inp.focus({ preventScroll: true });
    d.querySelectorAll(".accents button").forEach(b => b.onclick = () => {
      const s = inp.selectionStart ?? inp.value.length;
      inp.value = inp.value.slice(0, s) + b.dataset.c + inp.value.slice(inp.selectionEnd ?? s);
      inp.focus(); inp.setSelectionRange(s + b.dataset.c.length, s + b.dataset.c.length);
    });
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (!inp.readOnly) answerFill() } });
    document.getElementById("check").onclick = answerFill;
  }
}
function drawOrd() {
  const line = document.getElementById("line"), bank = document.getElementById("bank");
  line.innerHTML = run.line.length ? run.line.map((x, k) => `<button class="tile" data-k="${k}">${esc(x.w)}</button>`).join("") : `<span class="hint">Touche les mots dans l'ordre.</span>`;
  bank.innerHTML = run.bank.map((x, k) => `<button class="tile" data-k="${k}">${esc(x.w)}</button>`).join("");
  line.querySelectorAll(".tile").forEach(b => b.onclick = () => { run.bank.push(run.line.splice(+b.dataset.k, 1)[0]); drawOrd() });
  bank.querySelectorAll(".tile").forEach(b => b.onclick = () => { run.line.push(run.bank.splice(+b.dataset.k, 1)[0]); drawOrd() });
  document.getElementById("check").disabled = run.bank.length > 0;
}

function record(idx, ok) {
  sp(cur.id, curSet.id).r[idx] = ok ? 1 : 0;
  run.results.push({ idx, ok });
  save(); renderRail(cur.id); renderSets();
}
function feedback(cls, title, it, filled) {
  document.getElementById("fb").innerHTML = `<div class="fb ${cls}"><strong>${title}</strong>
    ${cls === "ok" ? "" : `<span class="ansline">Réponse : ${esc(it.t === "match" ? it.a[0] : it.a.join(" / "))}</span>`}
    <span class="why">${md(it.x)} <a href="#r-${cur.id}">Voir la fiche</a></span></div>`;
  if (it.q.includes("___")) document.getElementById("qtext").innerHTML = qHTML(it.q, filled);
  document.getElementById("act").innerHTML = `<button class="primary" id="next">${run.pos + 1 < run.order.length ? "Suivant" : "Voir le résultat"}</button>`;
  const nx = document.getElementById("next");
  nx.onclick = () => { run.pos++; renderQ() };
  nx.focus({ preventScroll: true });
}
const curItem = () => [run.order[run.pos], curSet.items[run.order[run.pos]]];
function answerMC(i) {
  const [idx, it] = curItem();
  const ok = run.opts[i] === it.a[0];
  document.querySelectorAll(".opt").forEach((b, j) => {
    b.disabled = true;
    if (run.opts[j] === it.a[0]) b.classList.add("right");
    else if (j === i) b.classList.add("wrong");
  });
  record(idx, ok);
  feedback(ok ? "ok" : "bad", ok ? "Correct !" : "Pas tout à fait.", it, it.a[0]);
}
function grade(v, answers) {
  const tries = [v, v.replace(/^\s*(oui|non)\s*,?\s*/i, "")];
  if (tries.some(t => answers.some(a => norm(a) === norm(t)))) return "ok";
  if (tries.some(t => answers.some(a => strip(a) === strip(t)))) return "near";
  return "bad";
}
const TITLES = { ok: "Correct !", near: "Presque. Vérifie les accents.", bad: "Pas tout à fait." };
function answerFill() {
  const [idx, it] = curItem();
  const inp = document.getElementById("ans");
  if (!inp.value.trim()) { inp.focus(); return }
  const cls = grade(inp.value, it.a);
  inp.readOnly = true; inp.classList.add(cls);
  document.getElementById("check").disabled = true;
  record(idx, cls === "ok");
  feedback(cls, TITLES[cls], it, it.a[0]);
}
function answerOrd() {
  const [idx, it] = curItem();
  const said = joinTokens(run.line.map(x => x.w));
  const ok = it.a.some(a => norm(a) === norm(said));
  document.querySelectorAll("#line .tile, #bank .tile").forEach(b => b.disabled = true);
  document.getElementById("line").classList.add(ok ? "ok" : "bad");
  document.getElementById("check").disabled = true; document.getElementById("clear").disabled = true;
  record(idx, ok);
  feedback(ok ? "ok" : "bad", TITLES[ok ? "ok" : "bad"], it);
}
function answerMatch() {
  const [idx, it] = curItem();
  let ok = true;
  it.pairs.forEach((p, i) => {
    const s = document.getElementById("m" + i), good = s.value === p[1];
    ok = ok && good; s.disabled = true;
    s.closest(".pair-row").classList.add(good ? "right" : "wrong");
    if (!good) s.insertAdjacentHTML("afterend", `<span class="fix">${esc(p[1])}</span>`);
  });
  document.getElementById("check").disabled = true;
  record(idx, ok);
  feedback(ok ? "ok" : "bad", TITLES[ok ? "ok" : "bad"], it);
}

function renderSummary() {
  const d = document.getElementById("drill");
  const ok = run.results.filter(r => r.ok).length, n = run.results.length;
  const t = sp(cur.id, curSet.id);
  t.runs++; t.best = Math.max(t.best, ok);
  save();
  const missed = run.results.filter(r => !r.ok);
  const s = setStats(cur.id, curSet);
  const si = cur.sets.indexOf(curSet), nextSet = cur.sets[si + 1];
  const i = TOPICS.indexOf(cur), next = TOPICS[i + 1];
  const more = curSet.items.length > RUN_MAX && s.ok < s.n;
  d.innerHTML = `<div class="summary">
    <span class="label">Résultat de cette série</span>
    <span class="big">${ok}/${n}</span>
    <div class="dots" aria-label="État de chaque exercice">${curSet.items.map((_, k) => { const v = t.r[k]; return `<i class="${v === 1 ? "r" : v === 0 ? "w" : ""}"></i>` }).join("")}</div>
    <span class="kind">${esc(curSet.title)} : ${s.ok}/${s.n} réussis</span>
    ${missed.length ? `<div class="missed">${missed.map(r => { const it = curSet.items[r.idx]; return `<div>${qHTML(it.q, it.q.includes("___") ? it.a[0] : null)} <br><b>${esc(it.a[0])}</b> · ${md(it.x)}</div>` }).join("")}</div>` : ""}
    <div class="actions">
      ${missed.length ? `<button class="primary" id="retry">Refaire les erreurs (${missed.length})</button>` : ""}
      ${more ? `<button class="${missed.length ? "ghost" : "primary"}" id="more">Série suivante</button>` : ""}
      ${nextSet ? `<button class="${missed.length || more ? "ghost" : "primary"}" id="nextSet">Passer à : ${esc(nextSet.title)}</button>` : next ? `<button class="${missed.length || more ? "ghost" : "primary"}" id="next">Chapitre suivant : ${esc(numLabel(next))}</button>` : ""}
      ${missed.length ? `<a class="ghost" href="#r-${cur.id}">Relire la fiche</a>` : ""}
      <button class="ghost" id="again">Recommencer</button>
      ${s.done ? `<button class="ghost" id="resetSet">Effacer cette série</button>` : ""}
    </div></div>`;
  const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn };
  on("retry", () => startRun(shuffle(missed.map(r => r.idx))));
  on("more", () => startRun(pickOrder(curSet)));
  on("nextSet", () => selectSet(nextSet.id));
  on("next", () => { location.hash = "t-" + next.id });
  on("again", () => startRun(curSet.items.length > RUN_MAX ? shuffle(curSet.items.map((_, k) => k)).slice(0, RUN_MAX) : curSet.items.map((_, k) => k)));
  on("resetSet", e => {
    const b = e.currentTarget;
    if (!b.dataset.armed) { b.dataset.armed = "1"; b.textContent = "Confirmer : effacer cette série"; return }
    delete P.t[cur.id][curSet.id]; save(); renderRail(cur.id); selectSet(curSet.id);
  });
  (document.getElementById("retry") || document.getElementById("more") || document.getElementById("nextSet") || document.getElementById("next") || document.getElementById("again")).focus({ preventScroll: true });
}

document.addEventListener("keydown", e => {
  if (/INPUT|SELECT/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
  const b = document.querySelector(`.opt[data-i="${+e.key - 1}"]:not(:disabled)`);
  if (b) { e.preventDefault(); b.click() }
});

const resetAll = document.getElementById("resetAll");
resetAll.onclick = () => {
  if (!resetAll.dataset.armed) { resetAll.dataset.armed = "1"; resetAll.textContent = "Confirmer : tout effacer"; return }
  P = { t: {}, sel: {}, view }; save(); delete resetAll.dataset.armed; resetAll.textContent = "Effacer toute la progression";
  route();
};

// ---------- mode ----------
function setView(v) {
  view = v; P.view = v; save();
  document.getElementById("vEx").setAttribute("aria-pressed", String(v === "ex"));
  document.getElementById("vRules").setAttribute("aria-pressed", String(v === "rules"));
}
document.getElementById("vEx").onclick = () => { const inT = cur && document.body.classList.contains("in-topic"); setView("ex"); if (inT) location.hash = "t-" + cur.id; else route() };
document.getElementById("vRules").onclick = () => { const inT = cur && document.body.classList.contains("in-topic"); setView("rules"); if (inT) location.hash = "r-" + cur.id; else route() };

function route() {
  const m = location.hash.match(/^#([tr])-(.+)$/);
  if (m && byId(m[2])) {
    setView(m[1] === "r" ? "rules" : "ex");
    return m[1] === "r" ? openRules(m[2]) : openTopic(m[2]);
  }
  setView(view);
  document.body.classList.remove("in-topic");
  if (window.matchMedia("(min-width: 821px)").matches) return view === "rules" ? openRules(P.last || TOPICS[0].id) : openTopic(P.last || TOPICS[0].id);
  cur = null;
  renderRail(null);
}
window.addEventListener("hashchange", route);
route();
