import React from "react";

export default function Menu({
  items = [],
  welcome = {},
  isSubmenuOpen = false,
  colors: { menuBackground, menuItemHoverBackground, menuItemMutedText },
}) {
  return (
    <div className={`menu-container ${isSubmenuOpen ? "submenu-open" : ""}`}>
      <ul className="menu-list">
        {items.map((item, index) => {
          if (item.type === "divider") {
            return <li className="menu-divider" key={index}></li>;
          }

          return (
            <li key={index}>
              <a
                className={`menu-item 
                ${item.isMuted ? " menu-item--muted" : ""}
                ${item.type === "submenu" ? " menu-item--submenu" : ""}
                `}
                href={item.href}
                onClick={(e) => item.onClick(e, welcome)}
                target={item.target}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
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
        .menu-container {
          font-family: "Arial", Helvetica, sans-serif;
          background-color: ${menuBackground};
          border-radius: 5px;
          max-width: calc(100vw - 24px);
          box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
            rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
          width: 250px;
          transition: all 300ms ease-in-out;
          transform-origin: bottom left;
           {
            /* z-index: 2;
          position: relative; */
          }
          transform-origin: bottom right;
          animation: menu-slide-in 90ms cubic-bezier(0.18, 0.89, 0.32, 1.28)
            both;
          text-align: left;
        }

        .submenu-open {
          opacity: 0.6;
        }

        .hidden {
          display: none;
        }

        .menu-list {
          list-style: none;
          padding: 5px;
          margin: 0;
        }

        .menu-item {
          display: block;
          user-select: none;
          transition: background 100ms ease-in-out;
          cursor: pointer;
          padding: 10px 10px;
          border-radius: 3px;
          text-align: left;
          color: var(--primary);
          text-decoration: none;
        }

        button.menu-item {
          font-size: 1rem;
          width: 100%;
          display: block;
        }

        .menu-item--submenu {
          position: relative;
        }
        .menu-item--submenu::after {
          content: "";

          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/></svg>')
            no-repeat;

          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);

          height: 15px;
          width: 15px;
        }
        .menu-item--submenu:focus:after,
        .menu-item--submenu:active:after {
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>')
            no-repeat;
        }

        .menu-item:hover,
        .menu-item:focus,
        .menu-item:active {
          background-color: ${menuItemHoverBackground};
          text-decoration: none;
        }

        .menu-item--muted {
          color: ${menuItemMutedText};
        }

        .menu-divider {
          border-top: 1px solid #ebebeb;
          margin: 5px -5px;
          height: 0;
        }
      `}</style>
    </div>
  );
}
