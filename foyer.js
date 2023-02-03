/* /////////////////////////////////////////////////////////
//
// Welcome to the foyer!
//
// Here you'll find some tasty vanilla JS
// This avoids too much dependency bloat, keeps things simple
// and allows easier comprehension of the code (hopefully).
// 
/* ///////////////////////////////////////////////////////*/

(function () {
  var foyer = {
    // default options
    options: {
      items: [],
      colors: {},
    },

    // State of menu open or closed
    isOpen: false,

    colors: {
      ctaBackground: "#3b3d4e",
      ctaHoverBackground: "#777785",
      ctaText: "#fff",
      menuBackground: "#f1f1f1f",
      menuItemHoverBackground: "#f2f2f2",
      menuItemMutedText: "#91929c",
    },

    _initColorOptions: function (colorOptions) {
      if (!colorOptions || typeof colorOptions !== "object") {
        return;
      }

      var colorOptionEntries = Object.entries(colorOptions);
      colorOptionEntries.forEach(([key, value]) => {
        if (!this.colors[key]) {
          var validColors = Object.keys(this.colors).join(", ");
          console.warn(
            `Foyer: ${key} is not a valid color option. Choose one of: ${validColors}`
          );
        }
        this.colors[key] = value;
      });
    },

    _createStyles: function () {
      var engageStyles = document.createElement("style");
      engageStyles.textContent = `
      #foyer--root {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 9999;
        font-family: sans-serif;
        font-size: 1rem;
        --primary: #3b3d4e;
      }

      #foyer--root,
      #foyer--root * {
        box-sizing: border-box;
      }

      #foyer--backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
      #foyer--cta {
        background-color: ${this.colors.ctaBackground};
        border: none;
        color: ${this.colors.ctaText};
        padding: 5px 15px;
        text-decoration: none;
        display: inline-block;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 1rem;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        transition: background-color 100ms ease-in-out;
        z-index: 2;
      }

      #foyer--cta:hover {
        background-color: ${this.colors.ctaHoverBackground};
      }
      
      #foyer--menu-container {
        position: absolute;
        bottom: 50px;
        right: 0;
        background-color: ${this.colors.menuBackground};
        border-radius: 5px;
        max-width: calc(100vw - 24px);
        box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
        width: 250px;
        z-index: 2;
      }

      .foyer--hidden {
        display: none;
      }

      .foyer--menu-list {
        list-style: none;
        padding: 5px;
        margin: 0;
      }

      .foyer--menu-item {
        display: block;
        user-select: none;
        transition: background 100ms ease-in-out;
        cursor: pointer;
        padding: 10px 10px;
        border-radius: 3px;

        color: var(--primary);
        text-decoration: none;
      }

      .foyer--menu-item:hover,
      .foyer--menu-item:focus,
      .foyer--menu-item:active
      {
        background-color: ${this.colors.menuItemHoverBackground};
      }

      .foyer--menu-item--muted {
        color: ${this.colors.menuItemMutedText};
      }

      .foyer--menu-divider {
        border-top: 1px solid #EBEBEB;
        margin: 5px -5px;
        height: 0;
      }
      `;
      document.head.appendChild(engageStyles);
    },

    _createRootEl: function () {
      var foyerRoot = document.createElement("div");
      foyerRoot.id = "foyer--root";
      return foyerRoot;
    },

    _createBackdropEl: function () {
      var foyerBackdrop = document.createElement("div");
      foyerBackdrop.id = "foyer--backdrop";
      foyerBackdrop.className = "foyer--hidden";
      return foyerBackdrop;
    },

    _createCTAEl: function () {
      var foyerButton = document.createElement("button");
      foyerButton.id = "foyer--cta";
      foyerButton.innerHTML = `?`;
      return foyerButton;
    },

    _createMenuEl: function () {
      var foyerMenu = document.createElement("div");
      var items = this.options.items || [];
      foyerMenu.id = "foyer--menu-container";
      foyerMenu.className = "foyer--hidden";

      var foyerListContainer = document.createElement("ul");
      foyerListContainer.className = "foyer--menu-list";
      items.forEach((item) => {
        var listItem = document.createElement("li");
        if (item.type == "divider") {
          listItem.className = "foyer--menu-divider";
        } else {
          if (!item.label) {
            console.warn("Foyer: Item label is required");
            return;
          }
          var link = document.createElement("a");
          link.className = "foyer--menu-item";
          link.innerText = item.label;
          link.href = item.href;

          if (item.target) {
            link.target = item.target;
          }

          if (item.isMuted) {
            link.classList.add("foyer--menu-item--muted");
          }

          if (item.onClick && typeof item.onClick === "function") {
            link.addEventListener("click", item.onClick);
          }

          listItem.appendChild(link);
        }
        foyerListContainer.appendChild(listItem);
      });

      foyerMenu.appendChild(foyerListContainer);
      return foyerMenu;
    },

    _setIsOpenState: function (isOpen) {
      this.isOpen = isOpen;
      var $foyerBackdrop = document.getElementById("foyer--backdrop");
      var $foyerMenu = document.getElementById("foyer--menu-container");
      if (isOpen) {
        $foyerMenu.classList.remove("foyer--hidden");
        $foyerBackdrop.classList.remove("foyer--hidden");
      } else {
        $foyerMenu.classList.add("foyer--hidden");
        $foyerBackdrop.classList.add("foyer--hidden");
      }
    },

    _handleToggleMenu: function () {
      this._setIsOpenState(!this.isOpen);
    },

    _initEventListeners: function () {
      var $foyerCTA = document.getElementById("foyer--cta");
      var $foyerBackdrop = document.getElementById("foyer--backdrop");

      $foyerBackdrop.addEventListener(
        "click",
        this._handleToggleMenu.bind(this)
      );
      $foyerCTA.addEventListener("click", this._handleToggleMenu.bind(this));

      // If escape key is pressed, close the menu
      document.addEventListener("keydown", (evt) => {
        evt = evt || window.event;
        if (!this.isOpen) {
          return;
        }
        var isEscape = false;
        if ("key" in evt) {
          isEscape = evt.key === "Escape" || evt.key === "Esc";
        } else {
          isEscape = evt.keyCode === 27;
        }
        if (isEscape) {
          this._handleToggleMenu();
        }
      });
    },

    close: function () {
      this._setIsOpenState(false);
    },
    open: function () {
      this._setIsOpenState(true);
    },
    init: function (options) {
      this.options = options;

      // Init DOM elements
      this._initColorOptions(options.colors);
      this._createStyles();
      var $foyerRoot = this._createRootEl();
      var $foyerButton = this._createCTAEl();
      var $foyerMenu = this._createMenuEl();
      var $foyerBackdropEl = this._createBackdropEl();
      $foyerRoot.appendChild($foyerButton);
      $foyerRoot.appendChild($foyerMenu);
      $foyerRoot.appendChild($foyerBackdropEl);
      document.body.appendChild($foyerRoot);

      this._initEventListeners();
    },
  };

  window.foyer = window.foyer || foyer;
})();
