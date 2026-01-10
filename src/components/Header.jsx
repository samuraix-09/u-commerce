import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import "../styles/Header.css";
import AddElement from "./AddElement";

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
          src="https://ucommerce.net/hubfs/Ucommerce%20and%20CMS%20Logo/Ucommerce%20logos/ucommerce-widelogo.svg"
          alt="U-Commerce logo"
        />
      </div>

      <div className="header__center">
        <Search />
      </div>

      <div className="header__right">
        <select className="header__filter">
          <option value="1">All</option>
          <option value="2">Fruits</option>
          <option value="3">Vegetables</option>
          <option value="4">Food</option>
          <option value="5">Fast food</option>
          <option value="6">Drink</option>
          <option value="7">Ice drink</option>
        </select>
      </div>
      <div className="add-div">
        <button className="add-btn" onClick={addelement}>Add element</button>
      </div>
      {open && <AddElement onClose={()=>setOpen(false)}/>}
    </header>
  );
}

export default Header;
