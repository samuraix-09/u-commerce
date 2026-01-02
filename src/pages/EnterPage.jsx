import { useNavigate } from "react-router-dom";
import "./EnterPage.css";

function EnterPage() {
  const navigate = useNavigate();

  return (
    <div className="enter">
      <div className="content">
        <h1>Welcome</h1>
        <p>Shop smart. Live better.</p>
        <button onClick={() => navigate("/login")}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default EnterPage;
