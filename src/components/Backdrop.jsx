import React from "react";

export default function Backdrop({ onClick }) {
  return (
    <div className="backdrop" onClick={onClick}>
      <style jsx>{`
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.05);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
