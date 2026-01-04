import { useNavigate } from "react-router-dom"

function Home(){
    let navigate = useNavigate();
    function changed(){
        changeStatus("entering");
        navigate("/login")
    }
    return <div>
        <h1>Bu home page</h1>
        <button>Logout</button>
    </div>
}

export default Home