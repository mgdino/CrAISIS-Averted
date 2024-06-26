import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"



function StandardHeader(props){

  var location = useLocation()


  useEffect(()=>{
    // console.log(location.pathname);
    const enlist = document.getElementById("nav-enlist")
    const cs = document.getElementById("nav-cs")
    const ips = document.getElementById("nav-ips")

    enlist.classList.remove("active")
    cs.classList.remove("active")
    ips.classList.remove("active")
    
    

    if(location.pathname === "/enlist"){
      enlist.classList.add("active")
    } else if(location.pathname === "/class-schedules"){
      cs.classList.add("active")
    } else if(location.pathname === "/individual-program-of-study"){
      ips.classList.add("active")
    }



    fetch("/student/" + props.studentId + "?format=json").then(
      response => response.json()
    ).then(
      data => {
        // console.log(data)
        let name = document.getElementById("student-name")
        name.innerHTML = data.first_name + " " +data.last_name
      })
  })

  function toggleSettings(){
    let s = document.getElementById("logout-panel")
    if(s.classList.contains("active")){
      s.classList.remove("active")
    } else {
      s.classList.add("active")
    }

  }

  function closeSettings(){
    let s = document.getElementById("logout-panel")
    s.classList.remove("active")
  }





    return  <>
    <header className="header standard" id="nav-standard">
      <div className='header-container'>
      <Link to="/" id='aisis-online-link' onClick={closeSettings}>
          <h1 id='aisis-text'>aisis </h1> <h1 id='online-text'>online</h1>
          </Link>
          <ul>
             <li>
              <Link id="nav-enlist" to="/enlist" onClick={closeSettings}>
                Enlist
              </Link>
             </li>
             <li>
              <Link id="nav-cs" to="/class-schedules" onClick={closeSettings}>
                Class Schedules
              </Link>
             </li>
             <li>
              <Link id="nav-ips" to="/individual-program-of-study" onClick={closeSettings}>
                My IPS
              </Link>
             </li>
             <li>
             <i id="logout-icon" className="fa fa-cog" onClick={toggleSettings}>

             </i>
              {/* <Link to="/login" onClick={() => {props.setStudentId(0)}}>
                Log Out
              </Link> */}
             </li>
          </ul>

          </div>

  </header>
  <div id="logout-panel">
                <p id='student-name' >User</p>
                <p>@{props.studentId}</p>
                <hr />
              <Link to="/login" onClick={() => {props.setStudentId(0)}}>
                Log Out
              </Link>
  </div>

  </>
}
export default StandardHeader