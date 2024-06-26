import logo from '../pages/pics/ateneo-logo.svg'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
// import { CSSTransition } from 'react-transition-group';

function LoginHeader(props){

  // const [nav, setNavState] = useState('header');

  // const className = "header " + (selected ? "standardh" : "");


  // useEffect(() => {
    
 
  //   // const nv = document.getElementById("nav");
  //   // console.log(nv)
  //   // console.log(window.location.pathname)
  //   if(window.location.pathname === "/"){
  //     // nv.classList.add('standardh')
  //     setNavState("header standardh")
  //   }

  // });

  // console.log(sample)
  // console.log(nav)

  
    // return  <header className={props.nav} id="nav">
    return  (
        <div>
        <header className={"header " + props.nav} id="nav">
        <div className='wrapper'>
        <div className='wrapper2'>
        <div className="container1">
        
        <Link to="/">
            <img src={logo} alt="logo" className={"logo1 " + props.nav}></img>
          </Link>
        
        </div>
        <div className="container2">
        <Link to="/"><img src={logo} alt="logo" className="logo2"></img></Link>
        </div>
        </div>
        </div>
      </header>


        </div>
        )

}
export default LoginHeader