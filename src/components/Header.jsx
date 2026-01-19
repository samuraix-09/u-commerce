import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import "../styles/Header.css";
import AddElement from "./AddElement";
import logo from "../Images/Ventro.png"

function Header() {
  const [hidden, setHidden] = useState(false);
  const [open , setOpen] = useState(false)
  const timerRef = useRef(null);

  const resetTimer = () => {
    setHidden(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setHidden(true);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();

    const events = ["mousemove", "keydown", "click", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function addelement(){
    setOpen(true)
  }

  return (
    <header className={`header ${hidden ? "header--hidden" : ""}`}>
      <div className="header__left">
        <img
          className="header__logo"
          src={logo}
          alt="Ventro logo"
        />
        <h1 className="logo-text">Ventro</h1>
      </div>

      <div className="header__center">
        <Search />
      </div>

      <div className="add-div">
        <button className="add-btn" onClick={addelement}>Add element</button>
      </div>
      {open && <AddElement onClose={()=>setOpen(false)}/>}
    </header>
  );
}

export default Header;
