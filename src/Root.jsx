import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root(params) {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem("loginConf")) navigate("enter");
    }, []);

    return <div className="inner-root">
        <Outlet/>
    </div>
};