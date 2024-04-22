/* global document */
import fs from "fs";
import { TextDecoder, TextEncoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { describe, expect, test } from "@jest/globals";
const jsdom = require("jsdom");

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console);

describe("welcome", () => {
  beforeEach(function () {
    document.body.innerHTML = `<div></div>`;
    const $welcomeScript = document.createElement("script");
    $welcomeScript.innerHTML = fs.readFileSync("./welcome.js", "utf8");
    document.body.appendChild($welcomeScript);
  });

  function isElementVisible(el) {
    var style = window.getComputedStyle(el);
    return style.display !== "none";
  }

  function injectBaseWelcomeInitScript(options) {
    if (!options) {
      options = {
        items: [
          {
            label: "Item 1",
            href: "https://example.com/item1",
          },
        ],
      };
    }

    const sInit = document.createElement("script");
    sInit.innerHTML = `
      welcome.init(${JSON.stringify(options)});
    `;
    document.body.appendChild(sInit);
  }

  test("Will render CTA", () => {
    injectBaseWelcomeInitScript();
    expect(document.getElementById("welcome--cta").textContent).toBe("?");
  });

  test("Menu not shown by default", () => {
    injectBaseWelcomeInitScript();
    const $menu = document.getElementById("welcome--menu-container");
    expect($menu.classList).toContain("welcome--hidden");
    expect(isElementVisible($menu)).toBeFalsy();
  });

  test("Menu shown when CTA clicked", () => {
    injectBaseWelcomeInitScript();

    document.getElementById("welcome--cta").click();

    const $menu = document.getElementById("welcome--menu-container");
    expect($menu.classList).not.toContain("welcome--hidden");
    expect(isElementVisible($menu)).toBeTruthy();
  });

  test("Menu contains a list of links", () => {
    injectBaseWelcomeInitScript({
      items: [
        {
          label: "Item 1",
          href: "https://example.com/item1",
        },
      ],
    });

    document.getElementById("welcome--cta").click();

    const $menuItems = document.getElementsByClassName("welcome--menu-item");
    const menuItemsArray = Array.from($menuItems).map((el) => ({
      label: el.innerText,
      href: el.href,
    }));
    expect(menuItemsArray).toEqual([
      { label: "Item 1", href: "https://example.com/item1" },
    ]);
  });

  test("Menu contains a divider", () => {
    injectBaseWelcomeInitScript({
      items: [
        {
          type: "divider",
        },
      ],
    });

    document.getElementById("welcome--cta").click();

    const $menuItems = document.getElementsByTagName("li");
    const menuItemsArray = Array.from($menuItems).map((el) => ({
      className: el.className,
      innerText: el.innerText,
    }));
    expect(menuItemsArray).toEqual([
      { className: "welcome--menu-divider", innerText: undefined },
    ]);
  });
});
