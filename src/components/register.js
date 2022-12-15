import React , {useState} from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Register = () => {

  const [user , setState] = useState({
    name: "",
    email:"",
    password:"",
    repassword:"" 
  })

  const handleChange = e=>{
    const {name,value}=e.target
     setState({
       ...user,
       [name]:value
     })
     console.log(user);
  }

  const register=()=>{
    const len=6;
    const {name, email ,password , repassword}=user;
    if(name && email && password){
      
      if(password.length < len){
        alert("Password length must be atleast 6");
      }
      else if(password===repassword){
        //alert("Registered")
        axios.post("http://localhost:5000/register",user)
        .then(res => alert(res.data.message));
      }
      else{
        console.log("enter properly")
        alert("Password do not match");
      }
    }
    else{
      alert("Please Submit carefully");
    }
    setState({
        name:"",
        email: "",
        password:"",
        repassword:""    
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
            <div className="collapse navbar-collapse " id="navbarNav" style={{color :"red"}}>
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
        
        <br />
        <div className='form2'>
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name="name" value={user.name} onChange={handleChange}  id="form3Example1c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="email"  name='email' value={user.email} onChange={handleChange}  id="form3Example3c" className="form-control"/>
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="password"  name='password' value={user.password} onChange={handleChange}  id="form3Example4c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input type="password"  name='repassword' value={user.repassword} onChange={handleChange}  id="form3Example4cd" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div> */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              
                          <button type="button" className="btn btn-primary btn-lg" onClick={register} >Register</button>
                          
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
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
 
export default Register;