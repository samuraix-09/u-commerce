import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root(params) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem("loginConf")) navigate("login");
    }, []);

    return <div className="inner-root">
        <h1>Welcome!</h1>
        <Outlet/>
    </div>
};