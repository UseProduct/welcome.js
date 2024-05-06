import React from "react";

export default function Button({ onClick, isOpen }) {
  return (
    <button onClick={onClick}>
      {isOpen ? (
        <img src={require("../../assets/close.svg")} alt="Info" />
      ) : (
        <img src={require("../../assets/question-symbol.svg")} alt="Info" />
      )}
      <style jsx="true">{`
        button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
          align-items: center;
          width: 35px;
          height: 35px;
          display: block;
        }

        button img {
          transform: ${isOpen ? "scale(0.8)" : "scale(1)"};
        }

        button:hover img {
          transform: scale(0.8);
        }

        img {
          width: 100%;
          height: 100%;
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </button>
  );
}
