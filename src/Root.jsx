import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

function Root({status}){
    return <div>
            {status === "entering" && <div>
                   <Outlet></Outlet>
                </div>}
                {status === "entered" && 
                <div>
                    <Header/>
                    <Outlet></Outlet>
                    <Footer/>
                </div>
                }
    </div>
}
export default Root