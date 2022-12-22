import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate} from "react-router-dom" 
const Logout = ({setLoginUser}) => {
    
      useEffect(() => { 
       setTimeout(() => {
       setLoginUser({});
       },1000);
       },[])

    return ( 
        <div style ={{backgroundColor : "#b5cde1" , height: "50rem"}}>
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
                {/* <li className="nav-item px-5">
                  <Link to="/logout" className="nav-link" href="#">logout</Link>
                </li> */}
                <li className="nav-item px-5">
                  <Link to="/register" className="nav-link" href="#">register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='logout' style={{paddingTop:"7rem"}} >
            <br />
            <h2>You have successfully logged out !</h2>
            <h2>Login to join again</h2>
        </div>

          </div>
     );

}
 
export default Logout;