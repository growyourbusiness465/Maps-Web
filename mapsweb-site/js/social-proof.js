/* MAPSWEB - PREUVE SOCIALE (obfusque) */
(function () {
  "use strict";
  if (
    typeof MW_SOCIAL_PROOF_CLIENTS === "undefined" ||
    !MW_SOCIAL_PROOF_CLIENTS.length
  )
    return;
  var _0 = [
    { k: ["plomberie", "plumbing"], i: "🔧" },
    { k: ["toiture", "toitures", "roofing"], i: "🏠" },
    { k: ["electricite", "electrical", "electricity"], i: "⚡" },
    { k: ["paysagement", "landscaping"], i: "🌳" },
    { k: ["nettoyage", "cleaning"], i: "🧹" },
    { k: ["climatisation", "hvac"], i: "🌡️" },
    { k: ["deneigement", "snow"], i: "❄️" },
    { k: ["renovation"], i: "🔨" },
    { k: ["peinture", "painting"], i: "🎨" },
    { k: ["chauffage", "heating"], i: "🔥" },
    { k: ["gouttieres", "gutter"], i: "🌧️" },
  ];
  var _1 = "🏢";
  function _2(_3) {
    return _3
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  function _4(_5) {
    var _6 = _2(_5);
    for (var _7 = 0; _7 < _0.length; _7++) {
      var _8 = _0[_7];
      for (var _9 = 0; _9 < _8.k.length; _9++) {
        if (_6.indexOf(_8.k[_9]) !== -1) return _8.i;
      }
    }
    return _1;
  }
  var _a = 6000;
  var _b = 4.5 * 60 * 1000;
  var _c = 5.5 * 60 * 1000;
  var _d = 8000;
  function _e() {
    return _b + Math.random() * (_c - _b);
  }
  function _f(_10) {
    var _11 = _10.slice();
    for (var _12 = _11.length - 1; _12 > 0; _12--) {
      var _13 = Math.floor(Math.random() * (_12 + 1));
      var _14 = _11[_12];
      _11[_12] = _11[_13];
      _11[_13] = _14;
    }
    return _11;
  }
  var _15 = _f(MW_SOCIAL_PROOF_CLIENTS);
  var _16 = 0;
  var _17 = document.createElement("style");
  _17.textContent =
    "#mw-social-proof{position:fixed;left:20px;bottom:20px;z-index:9998;width:328px;max-width:calc(100vw - 40px);display:flex;align-items:flex-start;gap:13px;background:#ffffff;border-radius:16px;padding:16px 18px;box-shadow:0 12px 32px rgba(20,20,43,.14),0 2px 8px rgba(20,20,43,.06);border:1px solid #ECEEF1;font-family:'Roboto',Arial,sans-serif;opacity:0;visibility:hidden;transition:opacity .8s ease,visibility 0s linear .8s}#mw-social-proof.mw-show{opacity:1;visibility:visible;transition:opacity .8s ease,visibility 0s linear 0s}#mw-social-proof .mw-sp-icon{flex-shrink:0;width:44px;height:44px;border-radius:12px;background:#EFF4FE;display:flex;align-items:center;justify-content:center;font-size:20px;margin-top:1px}#mw-social-proof .mw-sp-body{min-width:0;flex:1}#mw-social-proof .mw-sp-company{font-size:.8125rem;font-weight:700;color:#1a1d21;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.01em;display:block}#mw-social-proof .mw-sp-verified{display:inline-flex;align-items:center;gap:3px;margin-top:3px;background:#E6F4EA;color:#188038;font-size:.625rem;font-weight:700;padding:2px 8px;border-radius:999px;white-space:nowrap;letter-spacing:.2px}#mw-social-proof .mw-sp-verified svg{width:9px;height:9px;flex-shrink:0}#mw-social-proof .mw-sp-city{font-size:.75rem;color:#80868b;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#mw-social-proof .mw-sp-line{font-size:.75rem;color:#5F6368;margin-top:7px;line-height:1.45}#mw-social-proof .mw-sp-line b{color:#1a73e8;font-weight:700}#mw-social-proof .mw-sp-close{position:absolute;top:10px;right:10px;border:none;background:none;color:#B0B4B9;font-size:12px;cursor:pointer;line-height:1;padding:4px;border-radius:6px}#mw-social-proof .mw-sp-close:hover{color:#5F6368;background:#F1F3F4}@media (max-width:480px){#mw-social-proof{left:12px;right:12px;bottom:12px;width:auto}}".replace(
      /#/g,
      "#",
    );
  document.head.appendChild(_17);
  var _18 = document.createElement("div");
  _18.id = "mw-social-proof";
  _18.setAttribute("role", "status");
  _18.style.position = "fixed";
  _18.innerHTML =
    '<button type="button" class="mw-sp-close" aria-label="Fermer">✕</button><div class="mw-sp-icon"></div><div class="mw-sp-body"><span class="mw-sp-company"></span><div class="mw-sp-city"></div><span class="mw-sp-verified"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 8.5l3 3 7-7" stroke="#188038" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Client vérifié</span><div class="mw-sp-line"></div></div>';
  var _19 = false;
  function _1a(_1b) {
    _18.querySelector(".mw-sp-icon").textContent = _4(_1b.entreprise);
    _18.querySelector(".mw-sp-company").textContent = _1b.entreprise;
    _18.querySelector(".mw-sp-city").textContent = _1b.ville;
    _18.querySelector(".mw-sp-line").innerHTML =
      "a souscrit au service de <b>" + _1b.service + "</b>";
  }
  function _1c() {
    if (_19) return;
    if (_16 >= _15.length) {
      _15 = _f(MW_SOCIAL_PROOF_CLIENTS);
      _16 = 0;
    }
    _1a(_15[_16]);
    _16++;
    _18.classList.add("mw-show");
    setTimeout(function () {
      _18.classList.remove("mw-show");
      setTimeout(_1c, _e());
    }, _a);
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(_18);
    _18.querySelector(".mw-sp-close").addEventListener("click", function () {
      _19 = true;
      _18.classList.remove("mw-show");
    });
    setTimeout(_1c, _d);
  });
})();
