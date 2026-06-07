// ==UserScript==
// @name         YouTube Caption Styler
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Netflix-style captions with DM Sans
// @author       Sebak
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&display=swap';
  document.head.appendChild(font);

  GM_addStyle(`
    .ytp-caption-segment {
      font-family: 'DM Sans', sans-serif !important;
      font-size: 2.2rem !important;
      font-weight: 700 !important;
      color: #FFFFFF !important;
      background-color: transparent !important;
      padding: 0 4px !important;
      border-radius: 0 !important;
      text-shadow:
        -2px -2px 3px #000,
         2px -2px 3px #000,
        -2px  2px 3px #000,
         2px  2px 3px #000,
         0px  3px 6px rgba(0,0,0,0.9) !important;
      letter-spacing: 0.3px !important;
      line-height: 1.5 !important;
      -webkit-font-smoothing: antialiased !important;
    }

    /* Force the inner span container to center too */
    .ytp-caption-window-rollup span,
    .ytp-caption-window-bottom span {
      text-align: center !important;
      display: block !important;
    }
  `);

  function centerCaptions() {
    document.querySelectorAll('.caption-window').forEach(win => {
      win.style.setProperty('left', '50%', 'important');
      win.style.setProperty('transform', 'translateX(-50%)', 'important');
      win.style.setProperty('text-align', 'center', 'important');
      win.style.setProperty('width', '72%', 'important');
      // Also kill any right/margin that YouTube sets
      win.style.setProperty('right', 'auto', 'important');
      win.style.setProperty('margin-left', '0', 'important');
    });
  }

  // Observer for DOM changes
  const observer = new MutationObserver(() => centerCaptions());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });

  // Interval as hard backup - runs every 100ms
  setInterval(centerCaptions, 100);

})();