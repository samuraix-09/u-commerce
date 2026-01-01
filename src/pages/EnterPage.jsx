import { useNavigate } from "react-router-dom";
import image from "../images/enter-img.webp";
import "./EnterPage.css";

function EnterPage() {
  let navigate = useNavigate();

  function handleEnter() {
    navigate("/login");
  }

  return (
    <div className="enter-page">
      <img src={image} alt="Enter image" />
      <button onClick={handleEnter}>Get Started</button>
    </div>
  );
}

export default EnterPage;
