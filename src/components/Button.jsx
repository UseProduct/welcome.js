import React from "react";

export default function Button({ onClick, isOpen }) {
  return (
    <button onClick={onClick}>
      {isOpen ? (
        <img src={require("../../assets/x.svg")} alt="Info" />
      ) : (
        <img src={require("../../assets/i.svg")} alt="Info" />
      )}
      <style jsx>{`
        button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
          align-items: center;
          width: 45px;
          height: 45px;
          display: block;
          background: transparent;
          padding: 5px;
          display: block;
          border-radius: 5px;
          transition: background 180ms ease-in-out;
        }

        button:hover {
          background: #00000014;
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
