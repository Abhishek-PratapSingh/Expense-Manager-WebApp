import React from 'react'
import { Link , useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect} from "react";
import axios from "axios";
// import Setting from './components/setting';

const Home = () => {
   
   const navigate = useNavigate() ;
 

    return ( 

    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
                <li className="nav-item px-5">
                  <Link to="/login" className="nav-link ">login</Link>
                </li>
                <li className="nav-item px-5">
                  <Link to="/logout" className="nav-link" href="#">logout</Link>
                </li>
                <li className="nav-item px-5">
                  <Link to="/register" className="nav-link" href="#">register</Link>
                </li>
              </ul>
          </div>
        </div>
      </nav>
 
      <div class="container"  style={{backgroundColor: "powderBlue" , height : "40rem"}}>  
        <br />
        <h2 style ={{paddingTop: "5rem" }} >Welcome to home page! </h2>
        <hr /> 
        <h3 style ={{paddingLeft: "5rem" , paddingRight:"5rem" }} > Manage your expense and budget here!  </h3>
        <button  onClick={async e =>{

              navigate("/setting") }}  className="btn btn-primary btn-block mt-4" > Click here to go to Setting of expenses</button>
     </div>
        </div>
     );
}
 
export default Home;