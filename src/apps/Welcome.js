import { useState } from "react";
import { createRoot } from "react-dom/client";
import Backdrop from "../components/Backdrop";
import Button from "../components/Button";
import FeedbackForm from "../components/FeedbackForm";
import Menu from "../components/Menu";
import SubMenu from "../components/SubMenu";

function SubMenuContent() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* Here's where your sample content will live! */}
      <FeedbackForm />
    </div>
  );
}

function UpdatesSubMenuContent() {
  const [content, setContent] = useState("Loading...");
  // useEffect(() => {
  //   fetch("/updates.html")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //       setContent(data);
  //     });
  // });
  return (
    <div style={{ minHeight: 300, position: "relative" }}>
      <iframe
        src="/updates.html"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          bottom: 0,
          top: 0,
        }}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [submenuContent, setSubmenuContent] = useState(null);
  const [submenuTitle, setSubmenuTitle] = useState(null);

  const colors = {
    ctaBackground: "#3b3d4e",
    ctaHoverBackground: "#777785",
    ctaText: "#fff",
    menuBackground: "#fff",
    menuItemHoverBackground: "#f2f2f2",
    menuItemMutedText: "#91929c",
  };

  const menuItems = [
    {
      label: "Help & support",
      href: "https://github.com/useproduct/welcome.js/issues",
    },
    {
      type: "divider",
    },
    {
      label: "Contact us",
      href: "http://www.useproduct.com/",
    },
    {
      label: "Updates",
      type: "submenu",
      submenu: {
        title: "Updates",
        content: <UpdatesSubMenuContent />,
      },
      onClick: function (e) {
        e.preventDefault();
        setIsSubmenuOpen(!isSubmenuOpen);
        setSubmenuTitle("Updates");
        setSubmenuContent(<UpdatesSubMenuContent />);
      },
    },
    {
      label: "Feedback",
      type: "submenu",
      submenu: {
        title: "Updates",
        content: <SubMenuContent />,
      },
      onClick: function (e) {
        e.preventDefault();
        setIsSubmenuOpen(!isSubmenuOpen);
        setSubmenuTitle("Feedback");
        setSubmenuContent(<SubMenuContent />);
      },
    },
    {
      label: "Chat with us ('interactive')",
      onClick: function (e, welcome) {
        e.preventDefault();
        var value = prompt("What's your name?") || "stranger";
        alert("Hello " + value);

        welcome.setIsOpen(false);
      },
    },
    {
      type: "divider",
    },
    {
      label: "Twitter - @useproduct",
      href: "https://twitter.com/useproduct",
      target: "_blank",
      isMuted: true,
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setIsSubmenuOpen(false);
    setSubmenuContent(null);
  };

  const closeSubMenu = () => {
    setIsSubmenuOpen(false);
    setSubmenuContent(null);
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  return (
    <div className="welcome place-bottom-left">
      <div className={`menus-container ${isOpen ? "open" : "closed"}`}>
        <Menu
          colors={colors}
          items={menuItems}
          isSubmenuOpen={isSubmenuOpen}
          welcome={{
            setIsOpen,
          }}
        />
        {isSubmenuOpen && (
          <SubMenu
            title={submenuTitle}
            handleBack={(e) => closeSubMenu()}
            content={submenuContent}
            colors={colors}
          />
        )}
      </div>
      <div className="button-container">
        <Button
          isOpen={isOpen}
          onClick={(e) => {
            if (isOpen) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
        />
        <span className={`module-powered-by ${isOpen ? "open" : "closed"}`}>
          Powered by Product
        </span>
      </div>
      {isOpen && (
        <Backdrop
          onClick={() => {
            closeMenu();
          }}
        />
      )}
      <style jsx>{`
        .welcome {
          position: fixed;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 5px;
        }
        .place-bottom-left {
          bottom: 10px;
          left: 10px;
          align-items: flex-start;
        }
        .place-bottom-right {
          bottom: 10px;
          right: 10px;
          align-items: flex-end;
        }

        .menus-container {
          display: flex;
          gap: 0;
          align-items: flex-end;
        }

        .closed {
          display: none;
        }
        .open {
          z-index: 2;
          position: relative;
        }

        .button-container {
          z-index: 2;
          position: relative;
        }

        .module-powered-by {
          opacity: 0;
          position: absolute;
          left: 46px;
          bottom: 0;
          width: 50vw;
          font-size: 0.7rem;
          font-family: Helvetica, Arial, sans-serif;
          color: #999;
          bottom: 0.6rem;
          transition: all 500ms ease-in-out;
        }

        .module-powered-by.open {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
const root = createRoot(rootContainer);
root.render(<App />);
