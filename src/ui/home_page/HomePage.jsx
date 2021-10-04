import React from 'react'
import logo from "../../assets/images/logo.png"
import {Button} from "antd"
import { Link } from 'react-router-dom'
const HomePage = () => {
    return (
        <div>
            <div className="container">
                <div className="mt-5">
                    <h1 className = "text-center" >University Of Energy And Natural Resources</h1>
                </div>
                <div className="d-flex justify-content-center ">
                     <img width = "250px" src={logo} alt="" />
                </div>
                <div className="my-5">
                <h4 className = "my-4" >Final Year Project Demonstration</h4>
                     <h5  ><span className = "me-3" >Project Title:</span>  Face recognition applied in authentication </h5>                            
                 </div>
                 <div className="d-flex">
                     <h5>Presented By:</h5>
                     <div className="ms-4">
                         <h5>1. Werner Oscar (UE20029117) </h5>
                         <h5>2. Kelvin Kwakye  (UE20029117)</h5>
                         <h5>3. Rapheal Anaafi  (UE20029117)</h5>
                     </div>

                 </div>
                 <div className = "mt-4" style = {{display:"grid",placeItems:"center"}} >
                <Link to = "/login" >
                 <Button type = "primary" shape = "round" style = {{width:"300px",height:"70px"}} >Begin Demo</Button>

                </Link>

                 </div>

            </div>
        </div>
    )
}

export default HomePage
