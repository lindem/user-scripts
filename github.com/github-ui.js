// ==UserScript==
// @name         lindem-github-improv.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  my modifications to the default github ui.
// @author       Timo Lindemann <coffeeprocessor@gmail.com>
// @match        https://github.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
  /**
   * If GH ever changes its UI so the selectors no longer work, throw
   * an exception stating this clearly.
   *
   * @param {string} selector A jQuery-Selector
   * @return {jQuery} the jquery object.
   */
  function $$$(selector) {
    const sel = $(selector);
    if (sel.length === 0) {
      throw new Error("GH-TM-UI: Selector did not work; stopping script");
    } else {
      return sel;
    }
  }

  // we need the username; get it from the "your profile" link
  const username = $$$("a.dropdown-item:contains(Your profile)")
    .attr("href")
    .slice(1);

  /**
   * inserts a link to the "My repositories"-page into the main navigation.
   *
   * @method insertRepoLink
   */
  function insertRepoLink() {
    const repolink = "https://github.com/" + username + "?tab=repositories";
    const ui = $(
      `<li><a class="HeaderNavlink px-2" href="${repolink}"> Repos </li>`
    );
    $$$('ul.d-flex[role="navigation"]').prepend(ui);
  }

  /**
   * Hides the "Marketplace" and "Explore" links from the main navigation.
   *
   * @method removeUnusedNavigation
   */
  function removeUnusedNavigation() {
    // the "Marketplace" Link
    $$$('ul[role="navigation"] > li > a:contains(Marketplace)')
      .parent()
      .remove();
    // the "Explore" Link
    $$$('ul[role="navigation"] > li > a:contains(Explore)')
      .parent()
      .remove();
  }

  insertRepoLink();
  removeUnusedNavigation();
})();
