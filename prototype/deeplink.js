/* Runtime deep-link wiring for the prototype demo flow. build.mjs injects a
 * per-screen config as window.__DL and loads this script. It makes the screens'
 * key controls (primary buttons, "View All" links, table rows) navigate to the
 * relevant screen, so the gallery plays end-to-end. Conservative: only wires the
 * controls named in the config; everything else stays inert. */
(function () {
  var cfg = window.__DL;
  if (!cfg) return;

  function navigate(href) {
    return function (e) { e.preventDefault(); e.stopPropagation(); window.location.href = href; };
  }
  // visible text of an element, ignoring Material Symbols icon ligatures
  function textOf(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll('.material-symbols-outlined').forEach(function (s) { s.remove(); });
    return (c.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function wire(el, href) {
    if (!el || el.__dl) return;
    el.__dl = 1;
    el.style.cursor = 'pointer';
    el.addEventListener('click', navigate(href));
  }

  // primary buttons / labelled controls, matched by exact visible text
  (cfg.buttons || []).forEach(function (rule) {
    document.querySelectorAll('button, a, [role=button]').forEach(function (el) {
      if (textOf(el) === rule.text) wire(el, rule.href);
    });
  });

  // every tbody row -> one destination (single-table screens)
  if (cfg.rows) {
    document.querySelectorAll('tbody tr').forEach(function (tr) { wire(tr, cfg.rows); });
  }

  // rows mapped per table by DOM order (multi-table screens)
  if (cfg.rowsByTable) {
    var tables = document.querySelectorAll('table');
    cfg.rowsByTable.forEach(function (href, i) {
      if (tables[i]) tables[i].querySelectorAll('tbody tr').forEach(function (tr) { wire(tr, href); });
    });
  }

  // "View All" links, mapped by DOM order
  if (cfg.viewAll) {
    var seen = [];
    document.querySelectorAll('a, button').forEach(function (el) {
      if (/^view all/i.test(textOf(el))) seen.push(el);
    });
    cfg.viewAll.forEach(function (href, i) { if (seen[i]) wire(seen[i], href); });
  }
})();
