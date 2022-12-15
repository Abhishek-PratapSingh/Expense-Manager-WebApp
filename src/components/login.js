import React , {useState} from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
//import style from './styles/style.css';

const Login = ({ setLoginUser}) => {
   
  const navigate = useNavigate()

  const [user ,setState] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState({
        ...user,
        [name]: value
    })
    console.log(user);
}
  const login = ()=>{
    const {email ,password}=user;
    console.log("hiii");
    
    if(email && password){
      axios.post("http://localhost:5000/login",user)
      .then(res=>{
      alert(res.data.message)
      console.log(res.data)
      localStorage.setItem("userId" , res.data.user._id)
      setLoginUser(res.data.user)
      navigate.push("/")
       }
      );
      
    }
    else{
      alert("Please enter the details");
    }
    setState({
        email: "",
        password:""    
    })
  }

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
         
         <div>
         <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://img.freepik.com/free-vector/young-people-illustration-design_23-2148473079.jpg" style={{width: '185px'}} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Login here buddy</h4>
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input type="email" name="email" value={user.name} onChange={handleChange} id="form2Example11" className="form-control"  />
                          <label className="form-label" htmlFor="form2Example11">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" name ="password" value={user.password} onChange={handleChange} id="form2Example22" className="form-control" />
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={login}>Log
                            in</button>
                            <br />
                          {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/register">
                          <button type="button" className="btn btn-outline-danger"  >Create new</button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Login there!</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      </div>
      
    </div>
     );
}
 
export default Login;