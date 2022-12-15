import {Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import Setting from './components/setting';
//import style from './styles/style.css';
import { useState } from 'react';

function App() {
  const [ user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} /> 
          <Route path="/login" element={ <Login setLoginUser={setLoginUser} /> } />
          <Route path="/logout"  element={<Logout setLoginUser={setLoginUser}/> }  />
          <Route path="/register" element={ <Register/>}/>
          <Route path="/setting" element={ <Setting/>}/>
      </Routes>
      <br />
    </div>
  );
}

export default App;
