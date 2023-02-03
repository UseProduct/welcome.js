/* global document */
import { TextEncoder, TextDecoder } from "util";
import fs from "fs";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { describe, expect, test } from "@jest/globals";
const jsdom = require("jsdom");

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console);

describe("foyer", () => {
  beforeEach(function () {
    document.body.innerHTML = `<div></div>`;
    const $foyerScript = document.createElement("script");
    $foyerScript.innerHTML = fs.readFileSync("./foyer.js", "utf8");
    document.body.appendChild($foyerScript);
  });

  function isElementVisible(el) {
    var style = window.getComputedStyle(el);
    return style.display !== "none";
  }

  function injectBaseFoyerInitScript(options) {
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
      foyer.init(${JSON.stringify(options)});
    `;
    document.body.appendChild(sInit);
  }

  test("Will render CTA", () => {
    injectBaseFoyerInitScript();
    expect(document.getElementById("foyer--cta").textContent).toBe("?");
  });

  test("Menu not shown by default", () => {
    injectBaseFoyerInitScript();
    const $menu = document.getElementById("foyer--menu-container");
    expect($menu.classList).toContain("foyer--hidden");
    expect(isElementVisible($menu)).toBeFalsy();
  });

  test("Menu shown when CTA clicked", () => {
    injectBaseFoyerInitScript();

    document.getElementById("foyer--cta").click();

    const $menu = document.getElementById("foyer--menu-container");
    expect($menu.classList).not.toContain("foyer--hidden");
    expect(isElementVisible($menu)).toBeTruthy();
  });

  test("Menu contains a list of links", () => {
    injectBaseFoyerInitScript({
      items: [
        {
          label: "Item 1",
          href: "https://example.com/item1",
        },
      ],
    });

    document.getElementById("foyer--cta").click();

    const $menuItems = document.getElementsByClassName("foyer--menu-item");
    const menuItemsArray = Array.from($menuItems).map((el) => ({
      label: el.innerText,
      href: el.href,
    }));
    expect(menuItemsArray).toEqual([
      { label: "Item 1", href: "https://example.com/item1" },
    ]);
  });

  test("Menu contains a divider", () => {
    injectBaseFoyerInitScript({
      items: [
        {
          type: "divider",
        },
      ],
    });

    document.getElementById("foyer--cta").click();

    const $menuItems = document.getElementsByTagName("li");
    const menuItemsArray = Array.from($menuItems).map((el) => ({
      className: el.className,
      innerText: el.innerText,
    }));
    expect(menuItemsArray).toEqual([
      { className: "foyer--menu-divider", innerText: undefined },
    ]);
  });
});
