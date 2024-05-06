import React from "react";

export default function SubMenu({
  content,
  title,
  colors: { menuBackground },
  handleBack = () => {},
}) {
  return (
    <div className="submenu-container">
      {title && (
        <div className="submodule-header">
          <button className="submodule-back-button" onClick={handleBack}>
            ←
          </button>
          <h3>{title}</h3>
        </div>
      )}
      <div className="submodule-content">{content}</div>
      <style jsx="true">{`
        .submenu-container {
          font-family: "Arial", Helvetica, sans-serif;
          background-color: ${menuBackground};
          border-radius: 5px;
          max-width: calc(100vw - 24px);
          min-width: 350px;
          box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
            rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
          width: 250px;
          transform-origin: bottom left;
          animation: menu-slide-in 90ms cubic-bezier(0.18, 0.89, 0.32, 1.28)
            both;
          text-align: left;
          z-index: 3;
          left: 30px;
        }

        @media (max-width: 768px) {
          .submenu-container {
            position: absolute;
            right: 10px;
          }
        }

        .submodule-header {
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .submodule-back-button {
          background: none;
          border: none;
          font-size: 1rem;
          margin: 0;
          padding: 0;
        }

        .submodule-header h3 {
          font-size: 1rem;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
