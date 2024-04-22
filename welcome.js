/* /////////////////////////////////////////////////////////
//
// A warm welcome!
//
// Here you'll find some tasty vanilla JS
// This avoids too much dependency bloat, keeps things simple
// and allows easier comprehension of the code (hopefully).
// 
/* ///////////////////////////////////////////////////////*/

(function () {
  var welcome = {
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
      menuBackground: "#fff",
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
            `Welcome.js: ${key} is not a valid color option. Choose one of: ${validColors}`
          );
        }
        this.colors[key] = value;
      });
    },

    _createStyles: function () {
      var engageStyles = document.createElement("style");
      engageStyles.textContent = `
      #welcome--root {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 9999;
        font-family: sans-serif;
        font-size: 1rem;
        --primary: #3b3d4e;
      }

      #welcome--root,
      #welcome--root * {
        box-sizing: border-box;
      }

      #welcome--backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      
      #welcome--cta {
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

      #welcome--cta:hover {
        background-color: ${this.colors.ctaHoverBackground};
      }

      @-webkit-keyframes menu-slide-in {
        0% {
          -webkit-transform: translateY(0);
                  transform: translateY(0) scale(0.95);
        }
        85% {
          -webkit-transform: translateY(-5px) scale(1.05);
                  transform: translateY(-5px) scale(1.01);
        }
        100% {
          -webkit-transform: translateY(-5px) scale(1);
                  transform: translateY(-5px) scale(1);
        }
      }
      @keyframes menu-slide-in {
        0% {
          -webkit-transform: translateY(0);
                  transform: translateY(0) scale(0.95);
        }
        85% {
          -webkit-transform: translateY(-5px) scale(1.05);
                  transform: translateY(-5px) scale(1.01);
        }
        100% {
          -webkit-transform: translateY(-5px) scale(1);
                  transform: translateY(-5px) scale(1);
        }
      }

      #welcome--menu-container {
        position: absolute;
        bottom: 50px;
        right: 0;
        background-color: ${this.colors.menuBackground};
        border-radius: 5px;
        max-width: calc(100vw - 24px);
        box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
        width: 250px;
        z-index: 2;
        transform-origin: bottom right;
        animation: menu-slide-in 90ms cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
      }

      .welcome--hidden {
        display: none;
      }

      .welcome--menu-list {
        list-style: none;
        padding: 5px;
        margin: 0;
      }

      .welcome--menu-item {
        display: block;
        user-select: none;
        transition: background 100ms ease-in-out;
        cursor: pointer;
        padding: 10px 10px;
        border-radius: 3px;

        color: var(--primary);
        text-decoration: none;
      }

      .welcome--menu-item:hover,
      .welcome--menu-item:focus,
      .welcome--menu-item:active
      {
        background-color: ${this.colors.menuItemHoverBackground};
      }

      .welcome--menu-item--muted {
        color: ${this.colors.menuItemMutedText};
      }

      .welcome--menu-divider {
        border-top: 1px solid #EBEBEB;
        margin: 5px -5px;
        height: 0;
      }
      `;
      document.head.appendChild(engageStyles);
    },

    _createRootEl: function () {
      var welcomeRoot = document.createElement("div");
      welcomeRoot.id = "welcome--root";
      return welcomeRoot;
    },

    _createBackdropEl: function () {
      var welcomeBackdrop = document.createElement("div");
      welcomeBackdrop.id = "welcome--backdrop";
      welcomeBackdrop.className = "welcome--hidden";
      return welcomeBackdrop;
    },

    _createCTAEl: function () {
      var welcomeButton = document.createElement("button");
      welcomeButton.id = "welcome--cta";
      welcomeButton.innerHTML = `?`;
      return welcomeButton;
    },

    _createMenuEl: function () {
      var welcomeMenu = document.createElement("div");
      var items = this.options.items || [];
      welcomeMenu.id = "welcome--menu-container";
      welcomeMenu.className = "welcome--hidden";

      var welcomeListContainer = document.createElement("ul");
      welcomeListContainer.className = "welcome--menu-list";
      items.forEach((item) => {
        var listItem = document.createElement("li");
        if (item.type == "divider") {
          listItem.className = "welcome--menu-divider";
        } else {
          if (!item.label) {
            console.warn("Welcome.js: Item label is required");
            return;
          }
          var link = document.createElement("a");
          link.className = "welcome--menu-item";
          link.innerText = item.label;
          if (item.href) {
            link.href = item.href;
          } else {
            link.tabIndex = 0;
          }

          if (item.target) {
            link.target = item.target;
          }

          if (item.isMuted) {
            link.classList.add("welcome--menu-item--muted");
          }

          if (item.onClick && typeof item.onClick === "function") {
            link.addEventListener("click", item.onClick);

            // Allow keyboard navigation
            link.addEventListener("keydown", function (event) {
              if (event.code === "Space" || event.code === "Enter") {
                item.onClick(event);
              }
            });
          }

          listItem.appendChild(link);
        }
        welcomeListContainer.appendChild(listItem);
      });

      welcomeMenu.appendChild(welcomeListContainer);
      return welcomeMenu;
    },

    _setIsOpenState: function (isOpen) {
      this.isOpen = isOpen;
      var $welcomeBackdrop = document.getElementById("welcome--backdrop");
      var $welcomeMenu = document.getElementById("welcome--menu-container");
      if (isOpen) {
        $welcomeMenu.classList.remove("welcome--hidden");
        $welcomeBackdrop.classList.remove("welcome--hidden");
      } else {
        $welcomeMenu.classList.add("welcome--hidden");
        $welcomeBackdrop.classList.add("welcome--hidden");
      }
    },

    _handleToggleMenu: function () {
      this._setIsOpenState(!this.isOpen);
    },

    _initEventListeners: function () {
      var $welcomeCTA = document.getElementById("welcome--cta");
      var $welcomeBackdrop = document.getElementById("welcome--backdrop");

      $welcomeBackdrop.addEventListener(
        "click",
        this._handleToggleMenu.bind(this)
      );
      $welcomeCTA.addEventListener("click", this._handleToggleMenu.bind(this));

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
      var $welcomeRoot = this._createRootEl();
      var $welcomeButton = this._createCTAEl();
      var $welcomeMenu = this._createMenuEl();
      var $welcomeBackdropEl = this._createBackdropEl();
      $welcomeRoot.appendChild($welcomeButton);
      $welcomeRoot.appendChild($welcomeMenu);
      $welcomeRoot.appendChild($welcomeBackdropEl);
      document.body.appendChild($welcomeRoot);

      this._initEventListeners();
    },
  };

  window.welcome = window.welcome || welcome;
})();
