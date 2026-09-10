/* MAPSWEB - ACCES SECURISE */
(function () {
  var CODE_1 = atob("TUFQUzEwMQ=="); // MAPS101
  var CODE_2 = atob("TUFQUzEwMg=="); // MAPS102
  var CODE_3 = atob("TUFQUzEwMw=="); // MAPS103
  var CODE_4 = atob("TUFQUzEwNA=="); // MAPS104
  var VALID_CODES = [CODE_1, CODE_2, CODE_3, CODE_4];

  var SESSION_DURATION_HOURS = 24;
  var VERIFY_DELAY_MS = 5000;
  var STORAGE_KEY = "mw_access_granted";
  var storage = window.localStorage;
  var SESSION_DURATION_MS = SESSION_DURATION_HOURS * 60 * 60 * 1000;

  function getStoredSession() {
    try {
      return JSON.parse(storage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function grantSession() {
    storage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
  }

  var storedSession = getStoredSession();
  if (
    storedSession &&
    storedSession.ts &&
    Date.now() - storedSession.ts < SESSION_DURATION_MS
  ) {
    grantSession();
    return;
  }
  storage.removeItem(STORAGE_KEY);

  function normalizeCode(code) {
    return code.trim().toUpperCase();
  }

  var normalizedValidCodes = VALID_CODES.map(normalizeCode);

  var gateStyle = document.createElement("style");
  gateStyle.textContent =
    '#mw-access-gate{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a73e8 0%,#174ea6 100%);font-family:\'Roboto\',Arial,sans-serif;padding:20px}#mw-access-gate .mw-gate-card{background:#ffffff;border-radius:16px;max-width:400px;width:100%;padding:36px 32px 28px;box-shadow:0 20px 60px rgba(0,0,0,0.25);text-align:center;animation:mw-gate-in 0.35s ease}@keyframes mw-gate-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}#mw-access-gate .mw-gate-pin{width:48px;height:48px;margin:0 auto 14px;display:block}#mw-access-gate h2{margin:0 0 6px;font-size:20px;font-weight:700;color:#202124}#mw-access-gate p.mw-gate-sub{margin:0 0 22px;font-size:14px;color:#5f6368;line-height:1.4}#mw-access-gate input[type="text"]{width:100%;box-sizing:border-box;padding:12px 14px;font-size:15px;border:1.5px solid #dadce0;border-radius:8px;outline:none;transition:border-color 0.15s;text-align:center;letter-spacing:0.5px}#mw-access-gate input[type="text"]:focus{border-color:#1a73e8}#mw-access-gate button{width:100%;margin-top:14px;padding:12px 14px;font-size:15px;font-weight:600;color:#fff;background:#1a73e8;border:none;border-radius:8px;cursor:pointer;transition:background 0.15s;display:flex;align-items:center;justify-content:center;gap:8px}#mw-access-gate button:hover:not(:disabled){background:#1558b0}#mw-access-gate button:disabled{background:#8ab4f8;cursor:default}#mw-access-gate .mw-gate-spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,0.5);border-top-color:#fff;border-radius:50%;animation:mw-gate-spin 0.7s linear infinite;display:none}#mw-access-gate button.mw-loading .mw-gate-spinner{display:inline-block}@keyframes mw-gate-spin{to{transform:rotate(360deg)}}#mw-access-gate .mw-gate-msg{margin-top:14px;font-size:13.5px;min-height:18px}#mw-access-gate .mw-gate-msg.mw-error{color:#d93025}#mw-access-gate .mw-gate-msg.mw-success{color:#188038}';
  document.head.appendChild(gateStyle);
  var _11 = document.createElement("div");
  _11.id = "mw-access-gate";
  _11.innerHTML =
    '<div class="mw-gate-card"><svg class="mw-gate-pin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C10.48 2 6 6.48 6 12c0 7.5 10 17 10 17s10-9.5 10-17c0-5.52-4.48-10-10-10z" fill="#EA4335"/><circle cx="16" cy="12" r="4.2" fill="#ffffff"/></svg><h2>Accès à la plateforme d\'enregistrement</h2><p class="mw-gate-sub">Saisissez votre code d\'accès pour accéder à votre espace.</p><form id="mw-gate-form" autocomplete="off"><input type="text" id="mw-gate-input" placeholder="Votre code d\'accès" required><button type="submit" id="mw-gate-btn"><span class="mw-gate-spinner"></span><span class="mw-gate-btn-label">Vérifier mon accès</span></button><div class="mw-gate-msg" id="mw-gate-msg"></div></form></div>';
  document.documentElement.style.overflow = "hidden";
  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(_11);
  });
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    document.body.appendChild(_11);
  }
  _11.addEventListener("submit", function (e) {
    if (e.target.id !== "mw-gate-form") return;
    e.preventDefault();
    var _12 = document.getElementById("mw-gate-input");
    var _13 = document.getElementById("mw-gate-btn");
    var _14 = _13.querySelector(".mw-gate-btn-label");
    var _15 = document.getElementById("mw-gate-msg");
    var enteredCode = normalizeCode(_12.value);
    if (!enteredCode) return;
    _13.disabled = true;
    _13.classList.add("mw-loading");
    _14.textContent = "Vérification de votre accès...";
    _15.textContent = "";
    _15.className = "mw-gate-msg";
    setTimeout(function () {
      var isValidCode = normalizedValidCodes.indexOf(enteredCode) !== -1;
      if (isValidCode) {
        _14.textContent = "Accès vérifié";
        _15.textContent = "Accès autorisé, redirection...";
        _15.className = "mw-gate-msg mw-success";
        grantSession();
        setTimeout(function () {
          _11.style.transition = "opacity 0.3s ease";
          _11.style.opacity = "0";
          setTimeout(function () {
            _11.remove();
            document.documentElement.style.overflow = "";
          }, 300);
        }, 500);
      } else {
        _13.disabled = false;
        _13.classList.remove("mw-loading");
        _14.textContent = "accéder à mon dossie";
        _15.textContent =
          "Code d\'accès invalide. Vérifiez votre saisie ou contactez-nous.";
        _15.className = "mw-gate-msg mw-error";
        _12.focus();
        _12.select();
      }
    }, VERIFY_DELAY_MS);
  });
})();
