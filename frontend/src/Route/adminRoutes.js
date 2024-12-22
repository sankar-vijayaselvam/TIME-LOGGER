import React from "react";
import Home from "../Pages/Home";
import Additems from "../Pages/Additems";
const adminRoutes=[
    {path:'/',element:<Home/>},
    {path:'/newcard',element:<Additems/>}
];
export default adminRoutes;