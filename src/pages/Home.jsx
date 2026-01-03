import { useNavigate } from "react-router-dom"

function Home({changeStatus}){
    let navigate = useNavigate();
    function changed(){
        changeStatus("entering");
        navigate("/login")
    }
    return <div>
        <h1>Bu home page</h1>
        <button onClick={changed}>Logout</button>
    </div>
}

export default Home